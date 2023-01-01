import create from "zustand";
import { createInitiator } from "utils";
import { useEffect } from "react";
import { BigNumber } from "ethers";
import {
  getUSDTContract,
  getGNETContract,
  getSwapContract,
  getSwapSignerContract,
} from "lib/contractFactory";

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

  useEffect(() => {
    init();
  }, []);

  /**
   *
   * @param currency ERC20 Address want to swap
   * @param quantity number quantity
   * @returns contract receipt
   */
  const swapToken = async (currency: string, quantity: number) => {
    const swap = await getSwapSignerContract();
    const tx = await swap.swapToken(currency, quantity);
    const receipt = await tx.wait();
    return receipt;
  };

  return { ...store, swapToken };
};
