export interface ISponsorDao {
  level: string;
  percentage: string;
  value: string;
}

export const SPONSOR_DAO: Array<ISponsorDao> = [
  {
    level: "1",
    percentage: "3%",
    value: "3 USDT",
  },
  {
    level: "2",
    percentage: "2%",
    value: "2 USDT",
  },
  {
    level: "3",
    percentage: "1%",
    value: "1 USDT",
  },
];

export const DATA_DAO = [
  {
    id: "0",
    country: "turkey",
    name: "semidethaced villa in bodrum",
    price: "50",
    sold: "22",
    value: "22",
    image:
      "https://ik.imagekit.io/msxxxaegj/image_gn/image%20314_Tl3lglRsr.png?updatedAt=1697603453171",
    countryImage:
      "https://cdn.britannica.com/82/4782-050-8129909C/Flag-Turkey.jpg",
  },
  {
    id: "1",
    country: "indonesia",
    name: "bali villa",
    price: "50",
    sold: "22",
    value: "22",
    image:
      "https://ik.imagekit.io/msxxxaegj/image_gn/image%20314_Tl3lglRsr.png?updatedAt=1697603453171",
    countryImage:
      "https://cdn.britannica.com/48/1648-004-A33B72D8/Flag-Indonesia.jpg",
  },
  {
    id: "2",
    country: "indonesia",
    name: "bali villa",
    price: "50",
    sold: "22",
    value: "22",
    image:
      "https://ik.imagekit.io/msxxxaegj/image_gn/image%20314_Tl3lglRsr.png?updatedAt=1697603453171",
    countryImage:
      "https://cdn.britannica.com/48/1648-004-A33B72D8/Flag-Indonesia.jpg",
  },
];

export const DATA_DAO_OWNED = [
  {
    id: "0",
    country: "indonesia",
    name: "bali villa",
    price: "50",
    sold: "22",
    value: "22",
    image:
      "https://ik.imagekit.io/msxxxaegj/image_gn/image%20314_Tl3lglRsr.png?updatedAt=1697603453171",
    countryImage:
      "https://cdn.britannica.com/48/1648-004-A33B72D8/Flag-Indonesia.jpg",
  },
];
