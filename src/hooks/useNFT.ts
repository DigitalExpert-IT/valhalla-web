import {
  getNFTContract,
  getNFTSignerContract,
  getWallet,
} from "lib/contractFactory";
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
  initialize: boolean;
}

const useStore = create<IStore>(() => ({
  nfts: [],
  totalValueMap: 0,
  initialize: false,
}));

const { setState } = useStore;

export const useNFT = () => {
  const { isConnected, address } = useWallet();
  const store = useStore();

  useEffect(() => {
    const init = async () => {
      if (isConnected && !store.initialize) {
        await loadMyNFT();
        setState({ initialize: true });
      }
    };
    init();
  }, [isConnected, address]);

  const loadMyNFT = async () => {
    const nft = await getNFTContract();
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

    setState({
      nfts: nfts.map((nft) => {
        return {
          cardId: +nft.cardId,
          percentage: +nft.percentage,
          lastFarmedAt: nft.lastFarmedAt.toString(),
          mintedAt: nft.mintedAt.toString(),
          mintingPrice: +nft.mintingPrice,
        };
      }),
    });
  };

  const getFarmValue = async (tokenId: number) => {
    const nft = await getNFTContract();
    const farmValue = await nft.getFarmValue(tokenId);
    return farmValue;
  };

  const buyNFT = async (tokenId: number) => {
    const nftWithSigner = await getNFTSignerContract();
    const tx = await nftWithSigner.buy(tokenId);
    const receipt = await tx.wait();
    return receipt;
  };

  return { buyNFT, getFarmValue, loadMyNFT, ...store };
};
