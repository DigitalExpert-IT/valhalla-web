import { BigNumber } from "ethers";
import { toBn } from "evm-bn";

// need pure function to calculate price
export const gnetCalculation = (amount: BigNumber) => {
  const unit = toBn("1", 9);
  const ratePerGnet = toBn("0.015");
  const ratePerUnit = ratePerGnet.div(unit);
  const gnetAmount = amount.div(ratePerUnit);
  const tax = gnetAmount.mul(5).div(1000);
  return gnetAmount.add(tax);
};

export const usdtCalculation = (amount: BigNumber) => {
  const formatAmount = amount.mul(10 ** 9);
  const unit = toBn("1");
  const ratePerUsdt = toBn("66.66666666");
  const usdtAmout = formatAmount.mul(unit).div(ratePerUsdt);
  const tax = usdtAmout.mul(5).div(1000);
  return usdtAmout.add(tax);
};
