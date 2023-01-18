import create from "zustand";
import { toBn } from "evm-bn";
import { useEffect } from "react";
import { BigNumber } from "ethers";
import { useWallet } from "./useWallet";
import { SWAP_CONTRACT } from "constant/address";
import { createInitiator, gnetCalculation, usdtCalculation } from "utils";
import {
  getUSDTContract,
  getGNETContract,
  getSwapContract,
  getSwapSignerContract,
  getGNETSignerContract,
  getUSDTSignerContract,
  getWallet,
  CURRENT_CHAIN_ID,
} from "lib/contractFactory";
interface ICurencySpec {
  pair: {
    name: string;
    decimals: BigNumber;
    price: BigNumber;
  };
  address: string;
  totalPool: BigNumber;
  balance: BigNumber;
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

const init = createInitiator(async () => {
  const wallet = await getWallet();
  const [address] = await wallet.listAccounts();
  const swap = await getSwapContract();
  const usdt = await getUSDTContract();
  const gnet = await getGNETContract();
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
          name: gnetRatio.symbol,
          decimals: gnetRatio.decimal,
          price: gnetRatio.price,
        },
        address: gnetAddress,
        totalPool: gnetPool,
        balance: gnetBalance,
      },
      usdt: {
        pair: {
          name: usdtRatio.symbol,
          decimals: usdtRatio.decimal,
          price: usdtRatio.price,
        },
        address: usdtAddress,
        totalPool: usdtPool,
        balance: usdtBalance,
      },
    },
  });
});

export const useSwap = () => {
  const store = useStore();
  const { address } = useWallet();

  useEffect(() => {
    init();
  }, []);

  const approveGnet = async (quantity: BigNumber) => {
    const gnetSigner = await getGNETSignerContract();
    const gnet = await getGNETContract();
    const balance = await gnet.balanceOf(address);
    const totalPrice = gnetCalculation(quantity);
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

  const approveUsdt = async (quantity: BigNumber) => {
    const usdtSigner = await getUSDTSignerContract();
    const usdt = await getUSDTContract();
    const balance = await usdt.balanceOf(address);
    const totalPrice = usdtCalculation(quantity);
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
   * @returns
   * data.currency user wanted token
   * data.amount how much user want to swap his token
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
