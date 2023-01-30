import { BigNumber } from "ethers";
import { toBn } from "evm-bn";

// need pure function to calculate price
export const getGnetPrice = (usdtAmount: BigNumber) => {
  const unit = toBn("1", 9);
  const ratePerGnet = toBn("0.015");
  const ratePerUnit = ratePerGnet.div(unit);
  const gnetAmount = usdtAmount.div(ratePerUnit);
  const tax = gnetAmount.mul(5).div(1000);
  return gnetAmount.add(tax);
};

export const getUsdtPrice = (gnetAmount: BigNumber) => {
  const unit = toBn("1");
  const ratePerUsdt = toBn("66.66666666666666");
  const usdtAmout = gnetAmount.mul(unit).div(ratePerUsdt);
  const tax = usdtAmout.mul(5).div(1000);
  return usdtAmout.add(tax).mul(10 ** 9);
};
