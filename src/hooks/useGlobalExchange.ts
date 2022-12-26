import create from "zustand";
import {
  getGlobalExchageContract,
  getGlobalExchangeSignerContract,
} from "lib/contractFactory";
import { createInitiator } from "utils";
import { useEffect } from "react";
import { BigNumber } from "ethers";
import { Decimal } from "@prisma/client/runtime";

interface ICurencySpec {
  name: string;
  decimals: BigNumber;
  price: BigNumber;
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
      name: "",
      decimals: BigNumber.from(0),
      price: BigNumber.from(0),
      address: "",
      totalPool: BigNumber.from(0),
    },
    usdt: {
      name: "",
      decimals: BigNumber.from(0),
      price: BigNumber.from(0),
      address: "",
      totalPool: BigNumber.from(0),
    },
  },
};

export const useStore = create(() => initialState);

const { setState } = useStore;

const init = createInitiator(async () => {
  const contract = await getGlobalExchageContract();
  const gnet = await contract.nftn();
  const usdt = await contract.usdt();
  setState({
    currency: {
      gnet: {
        name: "GNET",
        decimals: BigNumber.from(9),
        price: BigNumber.from(1),
        address: gnet,
      },
      usdt: {
        name: "GNET",
        decimals: BigNumber.from(9),
        price: BigNumber.from(1),
        address: usdt,
      },
    },
  });
});

export const useGlobalExchange = () => {
  const store = useStore();

  useEffect(() => {
    init();
  }, []);

  const swapToken = async (currency: string, quantity: number) => {
    const contract = await getGlobalExchangeSignerContract();
    const swap = await contract.swapToken(currency, quantity);
    const tx = await swap.wait();
    return tx;
  };

  return { ...store, swapToken };
};
