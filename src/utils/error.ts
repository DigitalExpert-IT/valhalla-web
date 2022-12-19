export const getErrorMessage = (error: any) => {
  if (error?.data?.message)
    return error.data.message.replace(/.+\:\s/, "").replace(/revert\s/, "")
  if (error?.message) return error.message
  return "Unkown Error"
}
