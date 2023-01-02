import create from "zustand";
import { createInitiator } from "utils";
import { useEffect } from "react";
import { BigNumber } from "ethers";
import {
  getUSDTContract,
  getGNETContract,
  getSwapContract,
  getSwapSignerContract,
  getGNETSignerContract,
  getUSDTSignerContract,
  getERC20SignerContract,
} from "lib/contractFactory";
import { useWallet } from "./useWallet";
import { SWAP_CONTRACT } from "constant/address";
export const CURRENT_CHAIN_ID = (process.env.NEXT_PUBLIC_CHAIN_ID ||
  "0x89") as "0x89";
interface ICurencySpec {
  pair: {
    name: string;
    decimals: BigNumber;
    price: BigNumber;
  };
  address: string;
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
    },
    usdt: {
      pair: {
        name: "",
        decimals: BigNumber.from(0),
        price: BigNumber.from(0),
      },
      address: "",
      totalPool: BigNumber.from(0),
    },
  },
};

export const useStore = create(() => initialState);

const { setState } = useStore;

const init = createInitiator(async () => {
  const swap = await getSwapContract();
  const usdt = await getUSDTContract();
  const gnet = await getGNETContract();
  const gnetAddress = await swap.nftn();
  const usdtAddress = await swap.usdt();

  const [gnetRatio, usdtRatio, gnetPool, usdtPool] = await Promise.all([
    swap.getRatioFromAddress(gnetAddress),
    swap.getRatioFromAddress(usdtAddress),
    gnet.balanceOf(swap.address),
    usdt.balanceOf(swap.address),
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
      },
      usdt: {
        pair: {
          name: usdtRatio.symbol,
          decimals: usdtRatio.decimal,
          price: usdtRatio.price,
        },
        address: usdtAddress,
        totalPool: usdtPool,
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

  const approveGnet = async (quantity: number) => {
    const gnetSigner = await getGNETSignerContract();
    const gnet = await getGNETContract();
    const balance = await gnet.balanceOf(address);
    const pricePerUsdt = store.currency.usdt.pair.price;
    const totalPrice = pricePerUsdt.mul(quantity);
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
      await gnetSigner.approve(SWAP_CONTRACT[CURRENT_CHAIN_ID], totalPrice);
    }
  };

  const approveUsdt = async (quantity: number) => {
    const usdtSigner = await getERC20SignerContract(
      store.currency.usdt.address
    );
    const usdt = await getUSDTContract();
    const balance = await usdt.balanceOf(address);
    const pricePerGnet = store.currency.gnet.pair.price;
    const totalPrice = pricePerGnet.mul(quantity);
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
      await usdtSigner.approve(SWAP_CONTRACT[CURRENT_CHAIN_ID], totalPrice);
    }
  };

  const swapToken = async (data: { currency: string; quantity: number }) => {
    const isGnet = data.currency === "GNET";
    const swapContract = await getSwapSignerContract();
    if (isGnet) {
      await approveGnet(data.quantity);
      const tx = await swapContract.swapToken(
        store.currency.gnet.address,
        data.quantity
      );
      const receipt = await tx.wait();
      return receipt;
    }
    await approveUsdt(data.quantity);
    const tx = await swapContract.swapToken(
      store.currency.usdt.address,
      data.quantity
    );
    const receipt = await tx.wait();
    return receipt;
  };

  return { ...store, swapToken };
};
