import { t } from "i18next";

const format = (message?: string | null) => {
  if (!message) return message;
  return message
    .replace(/.+\:\s/, "")
    .replace(/revert\s/, "")
    .replace(/\s\(.+/, "");
};

export const getErrorMessage = (error: any) => {
  const errorTemp = `error.errorCode.${error.code}`;
  const errorCode = t(errorTemp);
  if (errorTemp === errorCode) {
    if (error?.reason) return format(error.reason);
    if (error?.data?.message) return format(error.data.message);
    if (error?.message) return format(error.message);
    return "Unknown Error";
  }
  return errorCode;
};
