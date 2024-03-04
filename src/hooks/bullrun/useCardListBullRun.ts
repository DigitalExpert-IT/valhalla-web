import { useEffect, useState } from "react";
import { BullRunV2 } from "valhalla-erc20/typechain-types";
import { BigNumber } from "ethers";
import { useBullRunContract } from "./useBullRunContract";
import { useAddress, useContractWrite } from "@thirdweb-dev/react";
import { useUSDTContract } from "hooks/useUSDTContract";
import { useAccountMap } from "hooks/valhalla";
import { BULLRUN_CONTRACT } from "constant/address";

type BaseCardType = Awaited<ReturnType<BullRunV2["nft_list"]>>;
type CardType = {
  id: BigNumber;
  price: BigNumber;
};

const TOTAL_NFT = 6;

const CURRENT_CHAIN_ID = (process.env.NEXT_PUBLIC_CHAIN_ID ||
  "0x29a") as "0x29a";

const contractAddress = BULLRUN_CONTRACT[CURRENT_CHAIN_ID];

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
          return { price: BigNumber.from(card), id: BigNumber.from(cardId) };
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
      contractAddress,
    ]);

    if (cardPrice.gt(usdtBalance)) {
      throw {
        code: "NotEnoughUSDTBalance",
      };
    }

    if (!account?.isRegistered) {
      throw {
        code: "RegistrationRequired",
      };
    }

    if (cardPrice.gte(allowance)) {
      await approveUSDT.mutateAsync({
        args: [contractAddress, cardPrice.mul(10)],
      });
    }

    const receipt = await buyNft.mutateAsync({ args: [_listId] });
    return receipt;
  };

  useEffect(() => {
    fetchData();
  }, [nftBullRun.contract]);

  return { isLoading: isLoading || nftBullRun.isLoading, data, buy };
};
