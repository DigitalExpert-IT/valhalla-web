export const shortenAddress = (address: string) => {
  if (address.length < 42) return address;
  const upper = address.toUpperCase();
  const head = upper.slice(0, 5);
  const tail = upper.slice(38);
  return `${head}...${tail}`;
};
