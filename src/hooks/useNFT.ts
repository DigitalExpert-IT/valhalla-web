import {
  getNFTContract,
  getNFTSignerContract,
  getGNETContract,
  getGNETSignerContract,
} from "lib/contractFactory";
import create from "zustand";
import { useWallet, useWalletStore } from "hooks";
import { useEffect } from "react";
import { BigNumber, BigNumberish } from "ethers";
import produce from "immer";
import { compareAddress, createInitiator } from "utils";

export interface IOwnedNFT {
  id: BigNumber;
  cardId: BigNumber;
  percentage: BigNumber;
  lastFarmedAt: BigNumber;
  mintedAt: BigNumber;
  mintingPrice: BigNumber;
}

export interface INFTCard {
  id: BigNumber;
  isMintable: boolean;
  price: BigNumber;
  halfingPercentage: BigNumber;
}

interface IStore {
  nftList: IOwnedNFT[];
  cardList: INFTCard[];
  balance: BigNumber;
  totalValueMap: BigNumber;
  isLoading: boolean;
}

const CARD_IDS = [0, 1, 2, 3, 4, 5];

const initialState = {
  nftList: [],
  cardList: [],
  balance: BigNumber.from("0"),
  totalValueMap: BigNumber.from("0"),
  isLoading: false,
};

export const useNftStore = create<IStore>(() => initialState);

const { setState } = useNftStore;

const loadCardList = async () => {
  const nft = await getNFTContract();
  const cardList = await Promise.all(
    CARD_IDS.map(async cardId => {
      const card = await nft.cardMap(cardId);
      return { ...card, id: BigNumber.from(cardId) };
    })
  );
  setState({ cardList });
};

const onBuy = async (params: [string, BigNumber]) => {
  const nft = await getNFTContract();
  const [address, tokenId] = params;
  if (compareAddress(address, useWalletStore.getState().address)) {
    const ownedToken = await nft.ownedTokenMap(tokenId);
    setState(prev => ({
      balance: prev.balance.add(1),
      nftList: [{ ...ownedToken, id: tokenId }, ...prev.nftList],
    }));
  }
};

const init = createInitiator(async () => {
  const nft = await getNFTContract();
  loadCardList();
  nft.on("Buy", (...params) => {
    onBuy(params as any);
  });
});

const resetAccount = () => {
  setState({
    balance: initialState.balance,
    nftList: initialState.nftList,
    totalValueMap: initialState.totalValueMap,
  });
};

export const useNFT = () => {
  const { isConnected, address } = useWallet();
  const store = useNftStore();

  useEffect(() => {
    init();
  });

  useEffect(() => {
    if (isConnected) {
      load();
    } else {
      resetAccount();
    }
  }, [isConnected, address]);

  const load = async () => {
    const nft = await getNFTContract();
    const balance = await nft.balanceOf(address);
    const tokenIds = await Promise.all(
      Array(balance.toNumber())
        .fill(null)
        .map((_, idx) => {
          return nft.tokenOfOwnerByIndex(address, idx);
        })
    );

    const nfts = await Promise.all(
      tokenIds.reverse().map(async tokenId => {
        const ownedNft = await nft.ownedTokenMap(tokenId);
        return { ...ownedNft, id: tokenId };
      })
    );

    setState({
      nftList: nfts.map(nft => nft),
      balance: balance,
    });
  };

  const buy = async (tokenId: BigNumberish) => {
    const gnetSigner = await getGNETSignerContract();
    const gnet = await getGNETContract();
    const balance = await gnet.balanceOf(address);
    const nft = await getNFTContract();
    const allowance = await gnet.allowance(address, nft.address);
    const card = await nft.cardMap(tokenId);
    const cardPrice = card.price;

    if (cardPrice.gt(balance)) {
      throw {
        code: "NotEnoughBalance",
      };
    }

    if (cardPrice.gt(allowance)) {
      await gnetSigner.approve(nft.address, cardPrice.mul(10));
    }

    const nftWithSigner = await getNFTSignerContract();
    const tx = await nftWithSigner.buy(tokenId);
    const receipt = await tx.wait();
    return receipt;
  };

  const farm = async (tokenId: BigNumber) => {
    const nftSigner = await getNFTSignerContract();
    const tx = await nftSigner.farm(tokenId);
    const receipt = await tx.wait();

    const nftIndex = store.nftList.findIndex(
      item => item.id.toNumber() === tokenId.toNumber()
    );
    if (nftIndex !== -1) {
      const ownedNft = await nftSigner.ownedTokenMap(tokenId);
      const nextState = produce(store, draft => {
        draft.nftList[nftIndex].lastFarmedAt = ownedNft.lastFarmedAt;
      });
      setState(nextState);
    }

    return receipt;
  };

  return { buy, load, farm, ...store };
};
