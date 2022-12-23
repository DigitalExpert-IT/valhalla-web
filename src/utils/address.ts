export const shortenAddress = (address: string) => {
  if (!address) return "0x0";
  if (address.length < 42) return address;
  const upper = address.toUpperCase();
  const head = upper.slice(0, 5);
  const tail = upper.slice(38);
  return `${head}...${tail}`;
};

export const compareAddress = (addressA: string, addressB: string) =>
  addressA?.toLowerCase() === addressB?.toLowerCase();
