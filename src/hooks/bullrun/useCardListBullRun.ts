import { useEffect, useState } from "react";
import { BullRunV2 } from "valhalla-erc20/typechain-types";
import { BigNumber } from "ethers";
import { useBullRunContract } from "./useBullRunContract";
import { useAddress, useContractWrite } from "@thirdweb-dev/react";
import { useUSDTContract } from "hooks/useUSDTContract";
import { useAccountMap } from "hooks/valhalla";

type BaseCardType = Awaited<ReturnType<BullRunV2["nft_list"]>>;
type CardType = BaseCardType & {
  id: BigNumber;
};

const TOTAL_NFT = 6;

export const useCardListBullRun = () => {
  const address = useAddress();
  const usdt = useUSDTContract();
  const nftBullRun = useBullRunContract();
  const buyNft = useContractWrite(nftBullRun.contract, "buyNft");
  const approveUSDT = useContractWrite(usdt.contract, "approve");
  const { data: account } = useAccountMap();
  const [data, setData] = useState<CardType[]>([]);
  const [isLoading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!nftBullRun.contract) return;

    try {
      const cardList = await Promise.all(
        new Array(Number(TOTAL_NFT)).fill(null).map(async (_, cardId) => {
          const card = await nftBullRun.contract!.call("nft_list", [cardId]);
          return { ...card, id: BigNumber.from(cardId) };
        })
      );
      setData(cardList);
    } catch (error) {
      console.error("Error fetching nft bull run list:", error);
    } finally {
      setLoading(false);
    }
  };

  const buy = async (_listId: number) => {
    if (!usdt.contract || !nftBullRun.contract || !address) return;
    const card = data[_listId];
    const cardPrice = card.price;
    const usdtBalance = await usdt.contract.call("balanceOf", [address]);
    const allowance = await usdt.contract.call("allowance", [
      address,
      usdt.contract.getAddress(),
    ]);

    if (cardPrice.gt(usdtBalance)) {
      throw {
        code: "NotEnoughUSDTBalance",
      };
    }

    if (cardPrice.gt(allowance)) {
      await approveUSDT.mutateAsync({
        args: [nftBullRun.contract.getAddress(), cardPrice.mul(10)],
      });
    }
    if (!account?.isRegistered) {
      throw {
        code: "RegistrationRequired",
      };
    }
    const receipt = await buyNft.mutateAsync({ args: [_listId] });
    return receipt;
  };

  useEffect(() => {
    fetchData();
  }, [nftBullRun.contract]);

  return { isLoading: isLoading || nftBullRun.isLoading, data, buy };
};
