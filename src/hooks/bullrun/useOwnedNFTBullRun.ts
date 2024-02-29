import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { ZERO_ADDRESS } from "constant/address";
import {
  useAddress,
  useContractWrite,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { useBullRunContract } from "./useBullRunContract";
import { NFT } from "@thirdweb-dev/sdk";
import { tokenList } from "constant/pages/nftBullRun";
import bullRunStore from "hooks/bullrun/bullRunStore";

export type TCoin = {
  name: string;
  image: string;
  address: string;
  decimal: number;
  value: BigNumber;
};

export type OwnedNftType = NFT & {
  id: BigNumber;
  nftIdx: number;
  cardId: number;
  coinAssets: TCoin[];
};

export const useOwnedNFTBullRun = (byPassAddress?: string) => {
  const nft = useBullRunContract();
  const claim = useContractWrite(nft.contract, "claimProfit");
  const address = useAddress() ?? byPassAddress ? byPassAddress : ZERO_ADDRESS;
  const ownedNft = useOwnedNFTs(nft.contract, address);
  const [isLoading, setLoading] = useState(false);
  const { setOwnedNftList } = bullRunStore();

  const fetch = async () => {
    if (!nft.contract) return;
    try {
      setLoading(true);
      const balance = await nft.contract.call("balanceOf", [address]);
      const totalCoin = await nft.contract.call("total_coin");

      const coinList = await Promise.all(
        Array(totalCoin.toNumber())
          .fill(null)
          .map((_, idx) => nft.contract!.call("coin_list", [idx]))
      );

      coinList.push(tokenList.find(item => item.name == "BULLRUN")?.address);

      const tokenIds = await Promise.all(
        Array(balance.toNumber())
          .fill(null)
          .map((_, idx) => {
            return nft.contract!.call("tokenOfOwnerByIndex", [address, idx]);
          })
      );

      const nftAssets: BigNumber[][] = await Promise.all(
        tokenIds.map(async tokenId => {
          return await Promise.all(
            coinList.map(coin => {
              return nft.contract!.call("nft_assets", [tokenId, coin]);
            })
          );
        })
      );

      const nfts = await Promise.all(
        tokenIds.reverse().map(async (tokenId, idx) => {
          const cardId = ownedNft?.data?.[idx]["metadata"]["id"] ?? 0;

          return {
            ...ownedNft?.data?.[idx],
            id: tokenId,
            cardId,
            coinAssets: tokenList.map((token, i) => ({
              ...token,
              value: nftAssets[idx][i],
            })),
            nftIdx: tokenIds.length - (1 - idx),
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
