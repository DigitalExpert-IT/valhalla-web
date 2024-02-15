export interface ISponsorDao {
  level: string;
  percentage: string;
  value: string;
}

export const SPONSOR_DAO: Array<ISponsorDao> = [
  {
    level: "1",
    percentage: "5%",
    value: "5 USDT",
  },
  {
    level: "2",
    percentage: "3%",
    value: "3 USDT",
  },
  {
    level: "3",
    percentage: "2%",
    value: "2 USDT",
  },
];

export const DATA_DAO = [
  {
    id: 0,
    country: "indonesia",
    name: "Luxury Bali Villa",
    price: "100",
    maxLot: 6500,
    sold: 0,
    value: "21",
    isComingSoon: true,
    imageCaraousel: [
      {
        picture:
          "https://ik.imagekit.io/msxxxaegj/image_gn/detail_bali_villa/detail_bali_villa_2.jpg?updatedAt=1698209422463",
      },
      {
        picture:
          "https://ik.imagekit.io/msxxxaegj/image_gn/detail_bali_villa/detail_bali_villa_1.jpg?updatedAt=1698209417147",
      },
      {
        picture:
          "https://ik.imagekit.io/msxxxaegj/image_gn/detail_bali_villa/detail_bali_villa_3.jpg?updatedAt=1698209417147",
      },
      {
        picture:
          "https://ik.imagekit.io/msxxxaegj/image_gn/detail_bali_villa/detail_bali_villa_4.jpg?updatedAt=1698209417147",
      },
      {
        picture:
          "https://ik.imagekit.io/msxxxaegj/image_gn/detail_bali_villa/detail_bali_villa_5.jpg?updatedAt=1698209417147",
      },
      {
        picture:
          "https://ik.imagekit.io/msxxxaegj/image_gn/detail_bali_villa/detail_bali_villa_6.jpg?updatedAt=1698209417147",
      },
    ],
    image:
      "https://ik.imagekit.io/msxxxaegj/image_gn/bali-vila.png?updatedAt=1706237676840",
    countryImage:
      "https://cdn.britannica.com/48/1648-004-A33B72D8/Flag-Indonesia.jpg",
  },
  {
    id: 1,
    country: "Türkiye",
    name: "Semidetached Villa in Bodrum",
    price: "100",
    maxlot: 6000,
    sold: 701,
    value: "90",
    isComingSoon: false,
    imageCaraousel: [
      {
        picture:
          "https://ik.imagekit.io/msxxxaegj/image_gn/detail_turkey_villa/detail_turkey_villa_10.jpg?updatedAt=1698209417147",
      },
      {
        picture:
          "https://ik.imagekit.io/msxxxaegj/image_gn/detail_turkey_villa/detail_turkey_villa_11.jpg?updatedAt=1698209422463",
      },
      {
        picture:
          "https://ik.imagekit.io/msxxxaegj/image_gn/detail_turkey_villa/detail_turkey_villa_5.jpg?updatedAt=1698209417147",
      },
      {
        picture:
          "https://ik.imagekit.io/msxxxaegj/image_gn/detail_turkey_villa/detail_turkey_villa_9.jpg?updatedAt=1698209417147",
      },
      {
        picture:
          "https://ik.imagekit.io/msxxxaegj/image_gn/detail_turkey_villa/detail_turkey_villa_2.jpg?updatedAt=1698209417147",
      },
      {
        picture:
          "https://ik.imagekit.io/msxxxaegj/image_gn/detail_turkey_villa/detail_turkey_villa_7.jpg?updatedAt=1698209417147",
      },
    ],
    image:
      "https://ik.imagekit.io/msxxxaegj/image_gn/turkey-villa.png?updatedAt=1697809212509",
    countryImage:
      "https://cdn.britannica.com/82/4782-050-8129909C/Flag-Turkey.jpg",
  },
];
