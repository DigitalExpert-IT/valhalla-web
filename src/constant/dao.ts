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
    country: "Türkiye",
    name: "Semidetached Villa in Bodrum",
    price: "100",
    sold: "0",
    value: "90",
    isComingSoon: false,
    imageCaraousel: [
      {
        picture:
          "https://ik.imagekit.io/msxxxaegj/image_gn/detail_turkey_villa/detail_turkey_villa_12.jpg?updatedAt=1698209422693",
      },
      {
        picture:
          "https://ik.imagekit.io/msxxxaegj/image_gn/detail_turkey_villa/detail_turkey_villa_11.jpg?updatedAt=1698209422463",
      },
      {
        picture:
          "https://ik.imagekit.io/msxxxaegj/image_gn/detail_turkey_villa/detail_turkey_villa_7.jpg?updatedAt=1698209420122",
      },
      {
        picture:
          "https://ik.imagekit.io/msxxxaegj/image_gn/detail_turkey_villa/detail_turkey_villa_5.jpg?updatedAt=1698209417147",
      },
    ],
    image:
      "https://ik.imagekit.io/msxxxaegj/image_gn/turkey-villa.png?updatedAt=1697809212509",
    countryImage:
      "https://cdn.britannica.com/82/4782-050-8129909C/Flag-Turkey.jpg",
  },
  {
    id: "1",
    country: "indonesia",
    name: "bali villa",
    price: "50",
    sold: "22",
    value: "90",
    isComingSoon: true,
    image:
      "https://ik.imagekit.io/msxxxaegj/image_gn/balivilla.png?updatedAt=1697684134687",
    countryImage:
      "https://cdn.britannica.com/48/1648-004-A33B72D8/Flag-Indonesia.jpg",
  },
];
