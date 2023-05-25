import { useEffect, useState } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { NFT } from "@warmbyte/valhalla/typechain-types";
import { useNFTContract } from "./useNFTContract";
import { BigNumber } from "ethers";

type OwnedTokenMapType = Awaited<ReturnType<NFT["ownedTokenMap"]>>;
export type OwnedNftType = OwnedTokenMapType & {
  id: BigNumber;
  tokenUri: string;
};

export const useOwnedNFTList = () => {
  const address = useAddress();
  const nft = useNFTContract();
  const [data, setData] = useState<OwnedNftType[]>([]);
  const [isLoading, setLoading] = useState(false);

  const init = async () => {
    if (!nft.contract) return;
    try {
      setLoading(true);
      const balance = await nft.contract.call("balanceOf", [address]);
      const tokenIds = await Promise.all(
        Array(balance.toNumber())
          .fill(null)
          .map((_, idx) => {
            return nft.contract!.call("tokenOfOwnerByIndex", [address, idx]);
          })
      );

      const nfts = await Promise.all(
        tokenIds.reverse().map(async tokenId => {
          const ownedNft = await nft.contract!.call("ownedTokenMap", [tokenId]);
          const cardId = ownedNft.cardId.toNumber();
          const tokenUri = `/api/image/${cardId}`;
          return { ...ownedNft, id: tokenId, tokenUri } as OwnedNftType;
        })
      );
      setData(nfts);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!address) return;
    init();
  }, [address, nft.contract]);

  return { isLoading: isLoading || nft.isLoading, data };
};
