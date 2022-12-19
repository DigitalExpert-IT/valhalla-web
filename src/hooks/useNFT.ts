import {
  getNFTContract,
  getNFTSignerContract,
  getWallet,
} from "lib/contractFactory";
import create from "zustand/react";
import { useWallet } from "./useWallet";
import { useEffect } from "react";
import { BigNumber } from "ethers";
import { toBn } from "evm-bn";

interface INFT {
  cardId: BigNumber;
  percentage: BigNumber;
  lastFarmedAt: BigNumber;
  mintedAt: BigNumber;
  mintingPrice: BigNumber;
}

interface IStore {
  nfts: INFT[];
  totalValueMap: BigNumber;
  isLoading: boolean;
}

const useStore = create<IStore>(() => ({
  nfts: [],
  totalValueMap: toBn("0"),
  isLoading: false,
}));

const { setState } = useStore;

export const useNFT = () => {
  const { isConnected, address } = useWallet();
  const store = useStore();

  useEffect(() => {
    loadMyNFT();
  }, [isConnected, address]);

  const loadMyNFT = async () => {
    if (store.isLoading) return;
    setState({ isLoading: true });
    const nft = await getNFTContract();
    const balanceNFT = await nft.balanceOf(address);
    const tokenIds = await Promise.all(
      Array(balanceNFT.toNumber())
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
          cardId: nft.cardId,
          percentage: nft.percentage,
          lastFarmedAt: nft.lastFarmedAt,
          mintedAt: nft.mintedAt,
          mintingPrice: nft.mintingPrice,
        };
      }),
      isLoading: false,
    });
  };

  const getFarmValue = async (tokenId: number) => {
    const nft = await getNFTContract();
    const farmValue = await nft.getFarmValue(tokenId);
    return farmValue;
  };

  const buy = async (tokenId: number) => {
    const nftWithSigner = await getNFTSignerContract();
    const tx = await nftWithSigner.buy(tokenId);
    const receipt = await tx.wait();
    return receipt;
  };

  return { buy, getFarmValue, loadMyNFT, ...store };
};
