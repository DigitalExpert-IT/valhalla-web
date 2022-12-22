import keccak from "keccak";

export const getKeccakHexHash = (s: string) => {
  return "0x" + keccak("keccak256").update(s).digest("hex");
};
