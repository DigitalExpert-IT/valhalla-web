const format = (message?: string | null) => {
  if (!message) return message;
  return message
    .replace(/.+\:\s/, "")
    .replace(/revert\s/, "")
    .replace(/\s\(.+/, "");
};

export const getErrorMessage = (error: any) => {
  if (error?.data?.message) return format(error.data.message);
  if (error?.message) return format(error.message);
  return "Unkown Error";
};
