import { BigNumber } from "ethers/lib/ethers";
// import { UNIT_LIST } from "constant/unitList";
import { fromBn } from "evm-bn";

// const toFixed = (num: number, symbol = "") => {
//   const formatted = num
//     .toFixed(3)
//     .replace(/\.000$/, "")
//     .replace(/00$/, "");
//   return `${formatted}${symbol}`;
// };

// export const prettyBn = (bn?: BigNumber, baseNumber = 18): string => {
//   if (!bn) return "0";
//   const value = +fromBn(bn, baseNumber);
//   if (value === 0) return "0";

//   if (value > 1_000_000_000) {
//     return toFixed(value / 1_000_000_000, "B");
//   }

//   if (value > 1_000_000) {
//     return toFixed(value / 1_000_000, "M");
//   }

//   if (value > 1_000) {
//     return toFixed(value / 1_0, "000");
//   }

//   return toFixed(value);
// };

const toFixed = (num: number, symbol = "") => {
  if (symbol === "K") {
    if (num % 1 === 0) return `${num}000`;
    return `${num.toFixed(2)}K`;
  }
  return `${num}${symbol}`;
};

export const prettyBn = (bn?: BigNumber, baseNumber = 18): string => {
  const UNIT_LIST = [
    { suffix: "T", threshold: 1e12 },
    { suffix: "B", threshold: 1e9 },
    { suffix: "M", threshold: 1e6 },
    { suffix: "K", threshold: 1e3 },
    { suffix: "", threshold: 1 },
  ];
  if (!bn) return "0";
  const value = +fromBn(bn, baseNumber);
  if (value === 0) return "0";
  const converter = UNIT_LIST.find(x => Math.abs(value) >= x.threshold);
  return converter !== undefined
    ? toFixed(value / converter!.threshold, converter!.suffix)
    : toFixed(value);
};
