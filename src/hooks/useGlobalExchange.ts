import create from "zustand";
import {
  getGlobalExchageContract,
  getGlobalExchangeSignerContract,
} from "lib/contractFactory";
import { createInitiator } from "utils";
import { useEffect } from "react";
import { BigNumber } from "ethers";

interface ICurencySpec {
  exchange: {
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
      exchange: {
        name: "",
        decimals: BigNumber.from(0),
        price: BigNumber.from(0),
      },
      address: "",
      totalPool: BigNumber.from(0),
    },
    usdt: {
      exchange: {
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
  const contract = await getGlobalExchageContract();
  const gnetAddress = await contract.nftn();
  const usdtAddress = await contract.usdt();
  const ratioGnet = await contract.getRatioFromAddress(gnetAddress);
  const ratioUsdt = await contract.getRatioFromAddress(usdtAddress);
  const poolGnet = await contract.getPoolBalance(gnetAddress);
  const poolUsdt = await contract.getPoolBalance(usdtAddress);

  setState({
    currency: {
      gnet: {
        exchange: {
          name: ratioGnet.symbol,
          decimals: ratioGnet.decimal,
          price: ratioGnet.price,
        },
        address: gnetAddress,
        totalPool: poolGnet,
      },
      usdt: {
        exchange: {
          name: ratioUsdt.symbol,
          decimals: ratioUsdt.decimal,
          price: ratioUsdt.price,
        },
        address: usdtAddress,
        totalPool: poolUsdt,
      },
    },
  });
});

export const useGlobalExchange = () => {
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
    const contract = await getGlobalExchangeSignerContract();
    const swap = await contract.swapToken(currency, quantity);
    const tx = await swap.wait();
    return tx;
  };

  return { ...store, swapToken };
};
