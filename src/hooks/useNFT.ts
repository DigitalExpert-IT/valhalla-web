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

type Pool = {
  claimable: BigNumber;
  valueLeft: BigNumber;
};

interface IStore {
  isLoading: boolean;
  nftList: IOwnedNFT[];
  cardList: INFTCard[];
  balance: BigNumber;
  totalValueMap: BigNumber;
  personalReward: BigNumber;
  rankReward: BigNumber;
  globalPool: Pool;
  ipoPool: Pool;
}

const CARD_IDS = [0, 1, 2, 3, 4, 5];

const initialState = {
  isLoading: false,
  nftList: [],
  cardList: [],
  balance: BigNumber.from("0"),
  totalValueMap: BigNumber.from("0"),
  personalReward: BigNumber.from("0"),
  rankReward: BigNumber.from("0"),
  globalPool: {
    claimable: BigNumber.from("0"),
    valueLeft: BigNumber.from("0"),
  },
  ipoPool: {
    claimable: BigNumber.from("0"),
    valueLeft: BigNumber.from("0"),
  },
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

/**
 * fetch Pool data
 */
const fetchPool = async () => {
  try {
    const nft = await getNFTContract();
    const [globalPool, ipoPool] = await Promise.all([
      nft.getGlobalPool(),
      nft.getIpoPool(),
    ]);
    setState({ globalPool, ipoPool });
  } catch (error) {}
};

const fetchAccount = async () => {
  try {
    const address = useWalletStore.getState().address;
    if (!address) return;
    const nft = await getNFTContract();
    const [personalReward, rankReward] = await Promise.all([
      nft.rewardMap(address),
      nft.getMyRankReward(),
    ]);
    setState({ personalReward, rankReward });
  } catch (error) {}
};

const onBuy = async (params: [string, BigNumber]) => {
  fetchPool();
  fetchAccount();
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
  fetchPool();
  loadCardList();
  nft.on("Buy", (...params: any[]) => {
    onBuy(params as any);
  });
});

const fetchTokenList = async () => {
  const address = useWalletStore.getState().address;
  if (!address) return;
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

const resetAccount = () => {
  setState({
    personalReward: initialState.personalReward,
    rankReward: initialState.rankReward,
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
      fetchTokenList();
      fetchAccount();
    } else {
      resetAccount();
    }
  }, [isConnected, address]);

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

  return { ...store, buy, farm };
};
