export const getTelegramBindingSignatureMessage = (username: string) =>
  `Hereby I would like to bind my address into telegram account with username ${username.replace(
    /^\@/,
    ""
  )}`;
