import create from "zustand";
import { OwnedNftType } from "./useOwnedNFTBullRun";

interface bullRunState {
  ownedNftList: OwnedNftType[] | null;
  setOwnedNftList: (newData: OwnedNftType[]) => void;
}

const bullRunStore = create<bullRunState>(set => ({
  ownedNftList: null,
  setOwnedNftList: newData => set({ ownedNftList: newData }),
}));

export default bullRunStore;
