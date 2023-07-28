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
import { getValhallaContract } from "../lib/contractFactory";

export interface IOwnedNFT {
  id: BigNumber;
  cardId: BigNumber;
  percentage: BigNumber;
  lastFarmedAt: BigNumber;
  mintedAt: BigNumber;
  mintingPrice: BigNumber;
  tokenUri: string;
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
  genesisPool: Pool;
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
  genesisPool: {
    claimable: BigNumber.from("0"),
    valueLeft: BigNumber.from("0"),
  },
};

export const useNftStore = create<IStore>(() => initialState);

const { setState } = useNftStore;

const loadCardList = async () => {
  setState({ isLoading: true });
  try {
    const nft = await getNFTContract();
    const cardList = await Promise.all(
      CARD_IDS.map(async cardId => {
        const card = await nft.cardMap(cardId);
        return { ...card, id: BigNumber.from(cardId) };
      })
    );
    setState({ cardList });
  } catch (e) {
  } finally {
    setState({ isLoading: false });
  }
};

/**
 * fetch Pool data
 */
const fetchPool = async () => {
  try {
    const nft = await getNFTContract();
    const [globalPool, ipoPool, genesisPool] = await Promise.all([
      nft.getGlobalPool(),
      nft.getIpoPool(),
      nft.getGenesisPool(),
    ]);
    setState({ globalPool, ipoPool, genesisPool });
  } catch (error) {}
};

const fetchAccount = async () => {
  try {
    const address = useWalletStore.getState().address;
    if (!address) return;
    const nft = await getNFTContract();
    const nftSigner = await getNFTSignerContract();
    const [personalReward, rankReward] = await Promise.all([
      nft.rewardMap(address),
      nftSigner.getMyRankReward(address),
    ]);
    setState({ personalReward, rankReward });
  } catch (error) {}
};

const onBuy = async (...params: [string, BigNumber]) => {
  fetchPool();
  fetchAccount();
  const nft = await getNFTContract();
  const [address, tokenId] = params;
  if (compareAddress(address, useWalletStore.getState().address)) {
    const ownedToken = await nft.ownedTokenMap(tokenId);
    const tokenUri = await nft.tokenURI(tokenId);
    setState(prev => ({
      balance: prev.balance.add(1),
      nftList: [{ ...ownedToken, id: tokenId, tokenUri }, ...prev.nftList],
    }));
  }
};

const fetchTokenList = async () => {
  try {
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
        const tokenUri = await nft.tokenURI(tokenId);
        return { ...ownedNft, id: tokenId, tokenUri };
      })
    );

    setState({
      nftList: nfts.map(nft => nft),
      balance: balance,
    });
  } catch (e) {
    // @todo we got error right here, address dosn't exist
  }
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

const init = createInitiator(async () => {
  const nft = await getNFTContract();
  const valhalla = await getValhallaContract();
  fetchPool();
  loadCardList();
  fetchAccount();
  nft.on("Buy", onBuy);
  valhalla.on("RankRewardOpened", fetchPool);
  valhalla.on("RankRewardClosed", fetchPool);
  valhalla.on("ClaimReward", () => {
    Promise.all([fetchAccount(), fetchPool()]);
  });
  valhalla.on("ClaimRankReward", () => {
    Promise.all([fetchPool(), fetchAccount()]);
  });
  valhalla.on("Registration", () => {
    Promise.all([fetchPool(), fetchAccount()]);
  });

  useWalletStore.subscribe(
    state => state.address,
    () => {
      resetAccount();
      fetchTokenList();
      fetchAccount();
    },
    { fireImmediately: true }
  );
});

export const useNFT = () => {
  const { address } = useWallet();
  const store = useNftStore();

  useEffect(() => {
    init();
  });

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
        code: "NotEnoughGnetBalance",
      };
    }

    if (cardPrice.gt(allowance)) {
      const approveTx = await gnetSigner.approve(
        nft.address,
        cardPrice.mul(10)
      );
      await approveTx.wait();
    }

    const nftWithSigner = await getNFTSignerContract();
    const tx = await nftWithSigner.buy(tokenId);
    const receipt = await tx.wait();
    return receipt;
  };

  const farm = async (tokenId: BigNumber) => {
    const nftSigner = await getNFTSignerContract();
    const ownedNft = await nftSigner.ownedTokenMap(tokenId);
    if (ownedNft.isBlackListed) {
      throw {
        code: "TokenFrozen",
      };
    }
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

  const claimReward = async () => {
    const nft = await getNFTSignerContract();
    const tx = await nft.claimReward();
    const receipt = await tx.wait();
    return receipt;
  };

  const claimRankReward = async () => {
    const nft = await getNFTSignerContract();
    const tx = await nft.claimRankReward();
    const receipt = await tx.wait();
    return receipt;
  };

  return { ...store, buy, farm, claimReward, claimRankReward };
};
