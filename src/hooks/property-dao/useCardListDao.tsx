import { useEffect, useState } from "react";
import { BaliVilla } from "valhalla-erc20/typechain-types";
import { BigNumber } from "ethers";
import { useDaoContract } from "./useDaoContract";
import { useContractRead } from "@thirdweb-dev/react";

type BaseCardType = Awaited<ReturnType<BaliVilla["getVilla"]>>;
type CardType = BaseCardType & {
  id: BigNumber;
};

export const useCardListDao = () => {
  const nftVilla = useDaoContract();
  const { data: totalList } = useContractRead(nftVilla.contract, "totalList");
  const [data, setData] = useState<CardType[]>([]);
  const [isLoading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!nftVilla.contract || !totalList) return;

    try {
      const cardList = await Promise.all(
        new Array(Number(totalList)).fill(null).map(async (_, cardId) => {
          const card = await nftVilla.contract!.call("getVilla", [cardId]);
          return { ...card, id: BigNumber.from(cardId) };
        })
      );
      setData(cardList);
    } catch (error) {
      console.error("Error fetching card data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [nftVilla.contract, totalList]);

  return { isLoading: isLoading || nftVilla.isLoading, data };
};
