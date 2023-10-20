import { useEffect, useState } from "react";
import { BaliVilla } from "valhalla-villa/typechain-types";
import { BigNumber } from "ethers";
import { useDaoContract } from "./useDaoContract";

type BaseCardType = Awaited<ReturnType<BaliVilla["getVilla"]>>;
type CardType = BaseCardType & {
  id: BigNumber;
};

const CARD_IDS = [0, 1];

export const useCardListDao = () => {
  const nftVilla = useDaoContract();
  const [data, setData] = useState<CardType[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!nftVilla.contract) return;

      try {
        const cardList = await Promise.all(
          CARD_IDS.map(async cardId => {
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

    fetchData();
  }, [nftVilla.contract]);

  return { isLoading: isLoading || nftVilla.isLoading, data };
};
