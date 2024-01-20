import create from "zustand";
import { OwnedNftType } from "./useOwnedNFTBullRun";

interface bullRunState {
  ownedNftList: OwnedNftType[];
  setOwnedNftList: (newData: OwnedNftType[]) => void;
}

const bullRunStore = create<bullRunState>(set => ({
  ownedNftList: [],
  setOwnedNftList: newData => set({ ownedNftList: newData }),
}));

export default bullRunStore;
