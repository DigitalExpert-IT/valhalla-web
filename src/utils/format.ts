import { BigNumberish, utils } from "ethers/lib/ethers";

const toFixed = (num: number, symbol = "") => {
  const formatted = num
    .toFixed(3)
    .replace(/\.000$/, "")
    .replace(/00$/, "");
  return `${formatted}${symbol}`;
};

export const prettyBn = (bn: BigNumberish, baseNumber = 18): string => {
  const value = +utils.formatUnits(bn, baseNumber);
  if (value === 0) return "0";

  if (value > 1_000_000_000) {
    return toFixed(value / 1_000_000_000, "B");
  }

  if (value > 1_000_000) {
    return toFixed(value / 1_000_000, "M");
  }

  if (value > 1_000) {
    return toFixed(value / 1_0, "000");
  }

  return toFixed(value);
};
