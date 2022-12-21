const normalizeChain = (chain: any) => {
  if (typeof chain === "string" && chain.at(0) === "0") return chain;
  if (typeof chain === "string") Number(chain).toString(16);
  if (typeof chain === "number") return chain.toString(16);
  return chain;
};

export const compareChain = (chainA: any, chainB: any) =>
  normalizeChain(chainA) === normalizeChain(chainB);
