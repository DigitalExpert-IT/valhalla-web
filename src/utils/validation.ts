import * as ethers from "ethers";
import { ValidationRule } from "react-hook-form";
import { t } from "i18next";

export const validateRequired = (
  fieldName: string
): ValidationRule<boolean> => {
  return {
    value: true,
    message: t("error.required", { field: fieldName }),
  };
};

export const validateAddress = (address: string) => {
  const isValid = ethers.utils.isAddress(address);
  if (!isValid) return t("error.address", { address });
  return undefined;
};
