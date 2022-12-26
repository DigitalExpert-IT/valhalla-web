export interface EthereumChainParameter {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}

export const network: Record<string, EthereumChainParameter> = {
  "0x89": {
    chainId: "0x89",
    chainName: "Polygon",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com"],
    blockExplorerUrls: ["https://polygonscan.com"],
  },
  "0x13881": {
    chainId: "0x13881",
    chainName: "Mumbai",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
  "0x539": {
    chainId: "0x539",
    chainName: "Localhost",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["http://localhost:8545"],
  },
  "0x29a": {
    chainId: "0x29a",
    chainName: "Devnet",
    nativeCurrency: {
      name: "DTH",
      symbol: "DTH",
      decimals: 18,
    },
    rpcUrls: ["https://valhalacoin.cloud"],
    blockExplorerUrls: ["https://explorer.valhalacoin.cloud/"],
  },
};
