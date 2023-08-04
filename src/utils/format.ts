import { BigNumber } from "ethers/lib/ethers";
import { UNIT_LIST } from "constant/unitList";
import { fromBn } from "evm-bn";

const toFixed = (num: number, symbol = "") => {
  if (symbol === "K") {
    if (num % 1 === 0) return `${num}000`;
    return `${num.toFixed(2)}K`;
  }
  return `${num}${symbol}`;
};

export const prettyBn = (bn?: BigNumber, baseNumber = 18): string => {
  if (!bn) return "0";
  const value = +fromBn(bn, baseNumber);
  if (value === 0) return "0";
  const converter = UNIT_LIST.find(x => value >= x.threshold);
  return converter !== undefined
    ? toFixed(value / converter!.threshold, converter!.suffix)
    : toFixed(value);
};
