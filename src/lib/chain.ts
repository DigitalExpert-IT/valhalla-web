import { Mumbai, Polygon } from "@thirdweb-dev/chains";

const CURRENT_CHAIN_ID = (process.env.NEXT_PUBLIC_CHAIN_ID || "0x89") as "0x89";

const chainMap = {
  "0x13881": Mumbai,
  "0x89": Polygon,
  "0x29a": {
    chainId: 666,
    chain: "Devnet",
    name: "Devnet",
    testnet: true,
    slug: "devnet",
    shortName: "dvn",
    nativeCurrency: {
      name: "DTH",
      symbol: "DTH",
      decimals: 18,
    },
    rpc: ["https://valhalacoin.cloud"],
  },
};

export const getActiveChain = () => {
  return chainMap[CURRENT_CHAIN_ID] as any;
};
