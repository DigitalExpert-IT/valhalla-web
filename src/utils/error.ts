import { t } from "i18next";

export interface IErrorType {
  argument: string;
  code: string;
  reason: string;
  value: string;
  data: {
    message: string;
  };
  message: string;
}

const format = (message?: string | null) => {
  if (!message) return message;
  return message
    .replace(/.+\:\s/, "")
    .replace(/revert\s/, "")
    .replace(/\s\(.+/, "");
};

export const getErrorMessage = (error: IErrorType) => {
  const errorTemp = `error.errorCode.${error.code}`;
  const errorCode = t(errorTemp);
  if (errorTemp === errorCode) {
    if (error?.reason) return format(error.reason);
    if (error?.data?.message) return format(error.data.message);
    if (error?.message) return format(error.message);
    return "Unkown Error";
  }
  return errorCode;
};
