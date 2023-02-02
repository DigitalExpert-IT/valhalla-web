import { toBn } from "evm-bn";

export const getUsdtRate = (usdtAmount: string) => {
  const ratePerGnet = toBn("0.015", 9);
  const formatAmount = toBn(usdtAmount, 9);
  const unit = toBn("1", 9);
  const gnetAmount = formatAmount.mul(unit).div(ratePerGnet);
  const tax = gnetAmount.mul(5).div(1000);
  return gnetAmount.sub(tax);
};

export const getGnetRate = (gnetAmount: string) => {
  const ratePerUsdt = toBn("66.666666666", 9);
  const unit = toBn("1", 6);
  const ratePerUnit = ratePerUsdt.div(unit);
  const usdtAmount = toBn(gnetAmount, 9).div(ratePerUnit);
  const tax = usdtAmount.mul(5).div(1000);
  return usdtAmount.sub(tax);
};
