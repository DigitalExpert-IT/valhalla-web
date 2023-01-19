import create from "zustand";
import { toBn } from "evm-bn";
import { useEffect } from "react";
import { BigNumber } from "ethers";
import { SWAP_CONTRACT } from "constant/address";
import { useWallet, useWalletStore } from "hooks";
import { createInitiator, getGnetPrice, getUsdtPrice } from "utils";
import {
  getWallet,
  getUSDTContract,
  getGNETContract,
  getSwapContract,
  CURRENT_CHAIN_ID,
  getSwapSignerContract,
  getGNETSignerContract,
  getUSDTSignerContract,
} from "lib/contractFactory";
interface ICurencySpec {
  pair: {
    name: string;
    price: BigNumber;
    decimals: BigNumber;
  };
  address: string;
  balance: BigNumber;
  totalPool: BigNumber;
}
interface ICurency {
  gnet: ICurencySpec;
  usdt: ICurencySpec;
}
interface IStore {
  currency: ICurency;
}

const initialState: IStore = {
  currency: {
    gnet: {
      pair: {
        name: "",
        decimals: BigNumber.from(0),
        price: BigNumber.from(0),
      },
      address: "",
      totalPool: BigNumber.from(0),
      balance: BigNumber.from(0),
    },
    usdt: {
      pair: {
        name: "",
        decimals: BigNumber.from(0),
        price: BigNumber.from(0),
      },
      address: "",
      totalPool: BigNumber.from(0),
      balance: BigNumber.from(0),
    },
  },
};

export const useStore = create(() => initialState);
const { setState } = useStore;

const fetchSwap = async () => {
  const usdt = await getUSDTContract();
  const gnet = await getGNETContract();
  const swap = await getSwapContract();
  const wallet = await getWallet();
  const [address] = await wallet.listAccounts();
  const gnetAddress = await swap.nftn();
  const usdtAddress = await swap.usdt();

  const [gnetRatio, usdtRatio, gnetPool, usdtPool, gnetBalance, usdtBalance] =
    await Promise.all([
      swap.getRatioFromAddress(gnetAddress),
      swap.getRatioFromAddress(usdtAddress),
      gnet.balanceOf(swap.address),
      usdt.balanceOf(swap.address),
      gnet.balanceOf(address),
      usdt.balanceOf(address),
    ]);

  setState({
    currency: {
      gnet: {
        pair: {
          price: gnetRatio.price,
          name: gnetRatio.symbol,
          decimals: gnetRatio.decimal,
        },
        totalPool: gnetPool,
        address: gnetAddress,
        balance: gnetBalance,
      },
      usdt: {
        pair: {
          name: usdtRatio.symbol,
          price: usdtRatio.price,
          decimals: usdtRatio.decimal,
        },
        totalPool: usdtPool,
        address: usdtAddress,
        balance: usdtBalance,
      },
    },
  });
};

const init = createInitiator(async () => {
  const contractSwap = await getSwapContract();
  await Promise.all([fetchSwap()]);

  contractSwap.on("SwapToken", () => {
    Promise.all([fetchSwap()]);
  });

  useWalletStore.subscribe(
    state => state.address,
    () => {
      fetchSwap();
    },
    { fireImmediately: true }
  );
});

export const useSwap = () => {
  const store = useStore();
  const { address } = useWallet();

  useEffect(() => {
    init();
  }, []);

  /**
   * @param usdtAmount type bignumber with 18 decimals
   * @returns contract receipts
   * @example approveGnet(toBn('1'))
   * @description this function make litle bit confusing
   * why parameters usdtAmount.
   * so in this function you ned swap your GNET with USDT.
   * this function depend in to getGnetPrice.
   * it means if user input how much USDT needed it going to be calculate how much GNET price want to swap.
   * and than this function call approval to approve your GNET to swap with USDT
   */
  const approveGnet = async (usdtAmount: BigNumber) => {
    const gnet = await getGNETContract();
    const balance = await gnet.balanceOf(address);
    const gnetSigner = await getGNETSignerContract();
    const totalPrice = getGnetPrice(usdtAmount);

    const allowance = await gnet.allowance(
      address,
      SWAP_CONTRACT[CURRENT_CHAIN_ID]
    );

    if (balance.lt(totalPrice)) {
      throw {
        code: "NotEnoughBalance",
      };
    }

    if (store.currency.gnet.totalPool.lt(totalPrice)) {
      throw {
        code: "NotEnoughPool",
      };
    }

    if (allowance.lt(totalPrice)) {
      const tx = await gnetSigner.approve(
        SWAP_CONTRACT[CURRENT_CHAIN_ID],
        totalPrice
      );
      const receipt = await tx.wait();
      return receipt;
    }
  };

  /**
   * @param gnetAmount type bignumber with 9 decimals
   * @returns contract receipts
   * @example approveUsdt(toBn('1', 9))
   * @description this function make litle bit confusing
   * why parameters gnetAmount.
   * so in this function you ned swap your USDT with GNET.
   * this function depend in to getUsdtPrice.
   * it means if user input how much gnet needed it going to be calculate how much USDT price want to swap.
   * and than after that this function call approval to approve your USDT to swap with GNET
   */

  const approveUsdt = async (gnetAmount: BigNumber) => {
    const usdt = await getUSDTContract();
    const balance = await usdt.balanceOf(address);
    const usdtSigner = await getUSDTSignerContract();
    const totalPrice = getUsdtPrice(gnetAmount);

    const allowance = await usdt.allowance(
      address,
      SWAP_CONTRACT[CURRENT_CHAIN_ID]
    );

    if (balance.lt(totalPrice)) {
      throw {
        code: "NotEnoughBalance",
      };
    }

    if (allowance.lt(totalPrice)) {
      const tx = await usdtSigner.approve(
        SWAP_CONTRACT[CURRENT_CHAIN_ID],
        totalPrice
      );
      const receipt = await tx.wait();
      return receipt;
    }
  };

  /**
   * @param data
   * @returns contract receipts
   * @description
   * {data.currency} user wanted token,
   * {data.amount} how much user want to swap his token
   */
  const swapCurrency = async (data: { currency: string; amount: string }) => {
    const tokenWanted = data.currency === "GNET";
    const swapContract = await getSwapSignerContract();
    if (tokenWanted) {
      // swap your USDT with GNET
      await approveUsdt(toBn(data.amount, 9));
      const tx = await swapContract.swapCurrency(
        store.currency.gnet.address,
        toBn(data.amount, 9)
      );
      const receipt = await tx.wait();
      return receipt;
    }
    // in this logic, u swap your GNET with USDT
    await approveGnet(toBn(data.amount));
    const tx = await swapContract.swapCurrency(
      store.currency.usdt.address,
      toBn(data.amount)
    );
    const receipt = await tx.wait();
    return receipt;
  };

  return { ...store, swapCurrency };
};
