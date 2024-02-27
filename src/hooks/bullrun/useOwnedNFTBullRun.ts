import { BigNumber } from "ethers";
import { compareAddress } from "utils";
import { useEffect, useState } from "react";
import { ZERO_ADDRESS } from "constant/address";
import {
  useAddress,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { useBullRunContract } from "./useBullRunContract";
import { NFT } from "valhalla-erc20/typechain-types";
import { BullRunV2 } from "valhalla-erc20/typechain-types";
import { toBn } from "evm-bn";
import { tokenList } from "constant/pages/nftBullRun";
import bullRunStore from "hooks/bullrun/bullRunStore";

type OwnedTokenMapType = Awaited<ReturnType<NFT["ownedTokenMap"]>>;
export type OwnedNftType = OwnedTokenMapType & {
  id: BigNumber;
  tokenUri: string;
  nftAssets: [];
};

const NFT_MUL_PROFIT = [1, 2.5, 5, 10, 50, 250];

export const useOwnedNFTBullRun = () => {
  const nft = useBullRunContract();
  const claim = useContractWrite(nft.contract, "claimProfit");
  const address = useAddress() ?? ZERO_ADDRESS;
  // const coinList = useContractRead(nft.contract, "coin_list", [address]); use this while coin will be more
  const [isLoading, setLoading] = useState(false);
  const { setOwnedNftList } = bullRunStore();

  const fetch = async () => {
    if (!nft.contract) return;
    try {
      setLoading(true);
      const balance = await nft.contract.call("balanceOf", [address]);
      const totalProfit = await nft.contract.call("totalProfit");
      const totalSales = await nft.contract.call("totalSales");

      const tokenIds = await Promise.all(
        Array(balance.toNumber())
          .fill(null)
          .map((_, idx) => {
            return nft.contract!.call("tokenOfOwnerByIndex", [address, idx]);
          })
      );

      const nftAssets = await Promise.all(
        Array(tokenList).map((item: any, idx) => {
          return nft.contract!.call("nft_assets", [idx, item.address]);
        })
      );

      const nfts = await Promise.all(
        tokenIds.reverse().map(async (tokenId, idx) => {
          const ownedNft = await nft.contract!.call("tokenIdToListNft", [
            tokenId,
          ]);
          const cardId = ownedNft["uri"];
          const tokenUri = `/api/image/nft/${cardId}`;
          const cardIdx = cardId.split("-")[1] - 1;
          const claimValue = totalProfit
            .div(totalSales)
            .mul(toBn(NFT_MUL_PROFIT[cardIdx].toString(), 6));
          return {
            ...ownedNft,
            id: tokenId,
            tokenUri,
            claimValue,
            nftAssets,
            nftIdx: tokenIds.length - 1 - idx,
          } as OwnedNftType;
        })
      );

      setOwnedNftList(nfts);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const claimReward = async (_nftIdx: number) => {
    if (!nft.contract || !address) return;

    try {
      const nftId = await nft.contract!.call("tokenOfOwnerByIndex", [
        address,
        _nftIdx,
      ]);

      const receipt = await claim.mutateAsync({ args: [nftId] });
      return receipt;
    } catch (error) {
      throw {
        code: "FailedToClaim",
      };
    }
  };

  useEffect(() => {
    nft.contract?.events.listenToAllEvents(event => {
      if (event.eventName === "ShareToken" || event.eventName === "Transfer") {
        fetch();
      }
    });

    return () => {
      nft.contract?.events.removeAllListeners();
    };
  }, [address]);

  useEffect(() => {
    if (!address) return;
    fetch();
  }, [address, nft.contract]);

  return {
    isLoading: isLoading || nft.isLoading,
    claimReward,
  };
};
