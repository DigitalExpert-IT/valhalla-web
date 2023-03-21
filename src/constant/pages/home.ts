import { t } from "i18next";

export * from "./PROJECT_LIST";

export const HEADER_IMAGE_DATA = [
  { uri: "/images/nft-farming.png", alt: t("common.nftFarming") },
  { uri: "/images/share-to-earn.png", alt: t("common.shareToEarn") },
  { uri: "/images/royalty-property.png", alt: t("common.royaltyProperty") },
  { uri: "/images/metavers.png", alt: t("common.metaverseProject") },
];

export const PROMOTION_IMAGE_DATA = [
  {
    uri: "/images/imgHomeFeatures1.png",
    title: t("pages.home.sectionFeature.fullTransparency.title"),
    subtitle: t("pages.home.sectionFeature.fullTransparency.subtitle"),
    bgColor: "#1A192B",
    imgCenter: false,
  },
  {
    uri: "/images/imgHomeFeatures2.png",
    title: t("pages.home.sectionFeature.fullAutomation.title"),
    subtitle: t("pages.home.sectionFeature.fullAutomation.subtitle"),
    bgColor: "#6D2076",
    imgCenter: false,
    bgImg: "/images/imgHomeFeatures2-bg.png",
  },
  {
    uri: "/images/imgHomeFeatures3.png",
    title: t("pages.home.sectionFeature.smartContract.title"),
    subtitle: t("pages.home.sectionFeature.smartContract.subtitle"),
    bgColor: "#080058",
    imgCenter: true,
  },
  {
    uri: "/images/imgHomeFeatures4.png",
    title: t("pages.home.sectionFeature.decentralized.title"),
    subtitle: t("pages.home.sectionFeature.decentralized.subtitle"),
    bgColor: "#8E59FF",
    imgCenter: true,
  },
];

export const OURTEAM = [
  {
    name: "Yusuf Kenan Can",
    image: "/assets/ourteam/yusuf-w-bg.JPG",
    division: "Chief Executive Officer",
  },
  {
    name: "Jonas Van Der Berg",
    image: "/assets/ourteam/jonas.jpg",
    division: "Chief Technology Officer",
  },
];

export const PARTNERSHIP = [
  {
    name: "partner1",
    image: "/assets/partnership/polygon.png",
  },
  {
    name: "partner2",
    image: "/assets/partnership/solid-proof.png",
  },
  {
    name: "partner3",
    image: "/assets/partnership/global-network.png",
  },
];

export interface IRankBonus {
  image: string;
  rank: string;
  pool: string;
  level: string;
  downline: string;
  claim: string;
  maxbuy: string;
  color: string;
  requirement: string;
}

export interface IRankNetwork {
  levelBonus: string;
  percent: string;
  value: string;
}

export interface ITokenomics {
  totalSupply: string;
  percent: string;
  value: string;
}

export const RANKNETWORK = [
  {
    levelBonus: "level 1-2",
    percent: "10%",
    value: "6.7 matic",
  },
  {
    levelBonus: "level 3",
    percent: "6%",
    value: "4.02 matic",
  },
  {
    levelBonus: "level 4",
    percent: "5%",
    value: "3.35 matic",
  },
  {
    levelBonus: "level 5-6",
    percent: "4%",
    value: "2.68 matic",
  },
  {
    levelBonus: "level 7-8",
    percent: "3%",
    value: "2.01 matic",
  },
  {
    levelBonus: "level 9-11",
    percent: "2%",
    value: "1.34 matic",
  },
  {
    levelBonus: "level 12-15",
    percent: "1%",
    value: "0.67 matic",
  },
  {
    levelBonus: "Reserve",
    percent: "3%",
    value: "2.01 matic",
  },
  {
    levelBonus: "Global Bonus",
    percent: "17%",
    value: "11.39 matic",
  },
  {
    levelBonus: "Development / Marketing",
    percent: "25%",
    value: "16.75 matic",
  },

  {
    levelBonus: "Total",
    percent: "100%",
    value: "67 matic",
  },
  {
    levelBonus: "Private Sale",
    percent: "-",
    value: "33 matic",
  },
];

export const RANKBONUS: Array<IRankBonus> = [
  {
    image: "/assets/rank/no-rank.svg",
    rank: "no rank",
    pool: "",
    level: "",
    downline: "",
    claim: "",
    maxbuy: "100000",
    requirement: "-",
    color: "white",
  },
  {
    image: "/assets/rank/common.svg",
    rank: "common",
    pool: "3%",
    level: "10 level",
    downline: "100",
    claim: "50000 NFT Value",
    maxbuy: "200000",
    requirement: "-",
    color: "#A8742F",
  },
  {
    image: "/assets/rank/rare.svg",
    rank: "rare",
    pool: "7%",
    level: "20 level",
    downline: "400",
    claim: "200000 NFT Value    ",
    maxbuy: "1000000",
    requirement: "2 common rank",
    color: "#666768",
  },
  {
    image: "/assets/rank/super-rare.svg",
    rank: "super rare",
    pool: "12%",
    level: "40 level",
    downline: "2000",
    claim: "1000000 NFT Value",
    maxbuy: "5000000",
    requirement: "2 rare rank",
    color: "#2A7FB8",
  },
  {
    image: "/assets/rank/epic.svg",
    rank: "epic",
    pool: "18%",
    level: "60 level",
    downline: "10000",
    claim: "5000000 NFT Value",
    maxbuy: "20000000",
    requirement: "2 super rare rank",
    color: "#E7570F",
  },
  {
    image: "/assets/rank/legend.svg",
    rank: "legend",
    pool: "26%",
    level: "80 level",
    downline: "50000",
    claim: "25000000 NFT Value",
    maxbuy: "100000000",
    requirement: "2 epic rank",
    color: "#E0475A",
  },
  {
    image: "/assets/rank/super-legend.svg",
    rank: "super legend",
    pool: "34%",
    level: "100 level",
    downline: "200000",
    claim: "100000000 NFT Value",
    maxbuy: "500000000",
    requirement: "2 legend rank",
    color: "#BE7DD8",
  },
  {
    image: "",
    rank: "Total",
    pool: "100%",
    level: "",
    downline: "",
    claim: "",
    maxbuy: "",
    requirement: "",
    color: "",
  },
  {
    image: "",
    rank: "TAX All downline",
    pool: "10%",
    level: "",
    downline: "",
    claim: "",
    maxbuy: "",
    requirement: "",
    color: "white",
  },
];

export const TOKENOMICS = [
  { totalSupply: "reserves", percent: "20%", value: "200.000.000" },
  { totalSupply: "network swap", percent: "25%", value: "250.000.000" },
  { totalSupply: "team", percent: "20%", value: "200.000.000" },
  { totalSupply: "marketing", percent: "20%", value: "200.000.000" },
  {
    totalSupply: "Ecosystem Development Fund",
    percent: "15%",
    value: "150.000.000",
  },
];
