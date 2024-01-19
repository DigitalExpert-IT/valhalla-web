import ee from "ee";
import { BigNumber } from "ethers";
import { compareAddress } from "utils";
import { useEffect, useState } from "react";
import { ZERO_ADDRESS } from "constant/address";
import { useAddress, useContractWrite } from "@thirdweb-dev/react";
import { useBullRunContract } from "./useBullRunContract";
import { NFT } from "valhalla-erc20/typechain-types";
import { fromBn } from "evm-bn";
import { useUSDTContract } from "hooks/useUSDTContract";

type OwnedTokenMapType = Awaited<ReturnType<NFT["ownedTokenMap"]>>;
export type OwnedNftType = OwnedTokenMapType & {
  id: BigNumber;
  tokenUri: string;
};

export const useOwnedNFTBullRun = () => {
  const nft = useBullRunContract();
  const usdt = useUSDTContract();
  const claim = useContractWrite(nft.contract, "claimProfit");
  const address = useAddress() ?? ZERO_ADDRESS;
  const [data, setData] = useState<OwnedNftType[]>([]);
  const [isLoading, setLoading] = useState(false);

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

      const nfts = await Promise.all(
        tokenIds.reverse().map(async (tokenId, idx) => {
          const ownedNft = await nft.contract!.call("tokenIdToListNft", [
            tokenId,
          ]);
          const cardId = ownedNft["uri"];
          const tokenUri = `/api/image/nft/${cardId}`;
          const claimValue = totalSales.mul(totalProfit).mul(ownedNft.price);
          return {
            ...ownedNft,
            id: tokenId,
            tokenUri,
            claimValue,
            nftIdx: tokenIds.length - 1 - idx,
          } as OwnedNftType;
        })
      );

      setData(nfts);
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
    const refetch = (data: any) => {
      if (
        compareAddress(data.from, address) ||
        compareAddress(data.to, address)
      ) {
        fetch();
      }
    };
    ee.addListener("nft-Transfer", refetch);

    return () => {
      ee.removeListener("nft-Transfer", refetch);
    };
  }, [address]);

  useEffect(() => {
    if (!address) return;
    fetch();
  }, [address, nft.contract]);

  return { isLoading: isLoading || nft.isLoading, data, claimReward };
};
