import { BigNumber, BigNumberish, utils } from "ethers/lib/ethers";
import { fromBn } from "evm-bn";

const toFixed = (num: number, symbol = "") => {
  if (symbol === "K") {
    if (num % 1 === 0) return `${num}000`;
    return `${num.toFixed(2)}K`;
  }
  return `${num}${symbol}`;
};

export const prettyBn = (bn?: BigNumber, baseNumber = 18): string => {
  const moneyUnitConverter = [
    { suffix: "T", threshold: 1e12 },
    { suffix: "B", threshold: 1e9 },
    { suffix: "M", threshold: 1e6 },
    { suffix: "K", threshold: 1e3 },
  ];

  if (!bn) return "0";
  const value = +fromBn(bn, baseNumber);
  if (value === 0) return "0";
  const converter = moneyUnitConverter.find(x => x.threshold < value);
  return toFixed(value / converter!.threshold, converter!.suffix);
};
