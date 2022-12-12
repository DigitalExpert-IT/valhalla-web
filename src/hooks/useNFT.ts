import {
  getNFTContract,
  getNFTSignerContract,
  getWallet,
} from "lib/contractFactory";
import { createInitiator } from "utils";
import { useMount } from "react-use";
import create from "zustand/react";
import { useWallet } from "./useWallet";
import { useEffect } from "react";

interface INFT {
  cardId: number;
  percentage: number;
  lastFarmedAt: string;
  mintedAt: string;
  mintingPrice: number;
}

interface IStore {
  nfts: INFT[];
  totalValueMap: number;
}

const useStore = create<IStore>(() => ({
  nfts: [],
  totalValueMap: 0,
}));

const { setState } = useStore;

const init = createInitiator(async () => {
  const nft = await getNFTContract();
});

export const useNFT = async () => {
  const { isConnected, address } = useWallet();
  const store = useStore();
  const nft = await getNFTContract();
  const nftWithSigner = await getNFTSignerContract();

  useEffect(() => {
    if (isConnected) {
      loadMyNFT();
    }
  }, [isConnected, address]);
  useMount(() => {
    init();
  });

  const loadMyNFT = async () => {
    const balanceNFT = await nft.balanceOf(address);
    const tokenIds = await Promise.all(
      Array(+balanceNFT)
        .fill(null)
        .map((_, idx) => {
          return nft.tokenOfOwnerByIndex(address, idx);
        })
    );
    const nfts = await Promise.all(
      tokenIds.map((token) => {
        return nft.tokenToCardMap(token);
      })
    );
    setState({ nfts });
  };

  const getFarmValue = async (tokenId: number) => {
    const farmValue = await nft.getFarmValue(tokenId);
    return farmValue;
  };

  const buyNFT = async (tokenId: number) => {
    const tx = await nftWithSigner.buy(tokenId);
    const receipt = await tx.wait();
    return receipt;
  };

  return { buyNFT, getFarmValue, ...store };
};
