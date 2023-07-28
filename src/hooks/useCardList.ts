import { useEffect, useState } from "react";
import { NFT } from "valhalla-erc20/typechain-types";
import { useNFTContract } from "./useNFTContract";
import { BigNumber, BigNumberish } from "ethers";
import { useGNETContract } from "./useGNETContract";
import { useAddress, useContractWrite } from "@thirdweb-dev/react";
import { useAccountMap, useIsRankRewardClaimable } from "./valhalla";
import { useMaxBuy } from "./nft/useMaxBuy";
import { MAX_BUY } from "constant/maxbuy";
import { toBn } from "evm-bn";

type BaseCardType = Awaited<ReturnType<NFT["cardMap"]>>;
type CardType = BaseCardType & {
  id: BigNumber;
};

const CARD_IDS = [0, 1, 2, 3, 4, 5];

export const useCardList = () => {
  const nft = useNFTContract();
  const gnet = useGNETContract();
  const maxBuy = useMaxBuy();
  const address = useAddress();
  const isRankRewardClaimable = useIsRankRewardClaimable();
  const approveGnet = useContractWrite(gnet.contract, "approve");
  const buyNft = useContractWrite(nft.contract, "buy");
  const { data: account } = useAccountMap();
  const [data, setData] = useState<CardType[]>([]);
  const [isLoading, setLoading] = useState(false);

  const init = async () => {
    if (!nft.contract) return;
    try {
      setLoading(true);
      const cardList = await Promise.all(
        CARD_IDS.map(async cardId => {
          const card = await nft.contract!.call("cardMap", [cardId]);
          return { ...card, id: BigNumber.from(cardId) };
        })
      );
      setData(cardList);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const buy = async (tokenId: BigNumberish) => {
    if (!gnet.contract || !nft.contract || !address) return;
    const card = await nft.contract!.call("cardMap", [tokenId]);
    const cardPrice = card.price;
    const gnetBalance = await gnet.contract.call("balanceOf", [address]);
    const allowance = await gnet.contract.call("allowance", [
      address,
      nft.contract.getAddress(),
    ]);

    if (cardPrice.gt(gnetBalance)) {
      throw {
        code: "NotEnoughGnetBalance",
      };
    }

    if (cardPrice.gt(allowance)) {
      await approveGnet.mutateAsync({
        args: [nft.contract.getAddress(), cardPrice.mul(10)],
      });
    }
    if (!account?.isRegistered) {
      throw {
        code: "RegistrationRequired",
      };
    }
    if (
      maxBuy.data
        ?.add(cardPrice)
        .gt(toBn(MAX_BUY[account?.rank as 0].toString(), 9))
    ) {
      throw {
        code: "MaxBuy",
      };
    }
    if (isRankRewardClaimable.data) {
      throw {
        code: "RankStarted",
      };
    }
    const receipt = await buyNft.mutateAsync({ args: [tokenId] });
    return receipt;
  };

  return { isLoading: isLoading || nft.isLoading, data, buy };
};
