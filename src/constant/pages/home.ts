import { t } from "i18next";

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
  },
  {
    uri: "/images/imgHomeFeatures2.png",
    title: t("pages.home.sectionFeature.fullAutomation.title"),
    subtitle: t("pages.home.sectionFeature.fullAutomation.subtitle"),
  },
  {
    uri: "/images/imgHomeFeatures3.png",
    title: t("pages.home.sectionFeature.smartContract.title"),
    subtitle: t("pages.home.sectionFeature.smartContract.subtitle"),
  },
  {
    uri: "/images/imgHomeFeatures4.png",
    title: t("pages.home.sectionFeature.decentralized.title"),
    subtitle: t("pages.home.sectionFeature.decentralized.subtitle"),
  },
];

export const OURTEAM = [
  {
    name: "Yusuf Kenan Can",
    image: "/assets/ourteam/yusuf.jpg",
    division: "Chief Executive Officer",
  },
  {
    name: "Jonas Van De Berg",
    image: "/assets/ourteam/jonas.jpg",
    division: "Chief Technology Officer",
  },
];

export const PARTNERSHIP = [
  {
    name: "partner1",
    image: "/assets/partnership/polygon-logo.png",
  },
  {
    name: "partner2",
    image: "/assets/partnership/solidproofv2.svg",
  },
  {
    name: "partner3",
    image: "/assets/partnership/gn-patnership.png",
  },
];

export interface IRankBonus {
  image: string;
  rank: string;
  pool: string;
  level: string;
  claim: string;
  maxBuy: number;
  color: string;
  requirement: string;
}

export interface IRankNetwork {
  levelBonus: string;
  percent: string;
  value: number;
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
    value: 6.7,
  },
  {
    levelBonus: "level 3",
    percent: "6%",
    value: 4.02,
  },
  {
    levelBonus: "level 4",
    percent: "5%",
    value: 3.35,
  },
  {
    levelBonus: "level 5-6",
    percent: "4%",
    value: 2.68,
  },
  {
    levelBonus: "level 7-8",
    percent: "3%",
    value: 2.01,
  },
  {
    levelBonus: "level 9-11",
    percent: "2%",
    value: 1.34,
  },
  {
    levelBonus: "level 12-15",
    percent: "1%",
    value: 0.67,
  },
  {
    levelBonus: "Reserve",
    percent: "3%",
    value: 2.01,
  },
  {
    levelBonus: "Global Omzet",
    percent: "17%",
    value: 11.39,
  },
  {
    levelBonus: "Fee Receiver",
    percent: "25%",
    value: 16.75,
  },
  {
    levelBonus: "Total",
    percent: "100%",
    value: 67,
  },
];

export const RANKBONUS: Array<IRankBonus> = [
  {
    image: "/assets/rank/No Rank.svg",
    rank: "no rank",
    pool: "",
    level: "",
    claim: "",
    maxBuy: 100000,
    requirement: "-",
    color: "white",
  },
  {
    image: "/assets/rank/common.svg",
    rank: "common",
    pool: "5%",
    level: "10 level",
    claim: "25000 NFT Value",
    maxBuy: 100000,
    requirement: "-",
    color: "#A8742F",
  },
  {
    image: "/assets/rank/rare.svg",
    rank: "rare",
    pool: "13%",
    level: "20 level",
    claim: "100000 NFT Value",
    maxBuy: 500000,
    requirement: "2 common rank",
    color: "#666768",
  },
  {
    image: "/assets/rank/Super Rare.svg",
    rank: "super rare",
    pool: "16%",
    level: "40 level",
    claim: "500000 NFT Value",
    maxBuy: 2500000,
    requirement: "2 rare rank",
    color: "#2A7FB8",
  },
  {
    image: "/assets/rank/epic.svg",
    rank: "epic",
    pool: "19%",
    level: "60 level",
    claim: "2500000 NFT Value",
    maxBuy: 10000000,
    requirement: "2 super rare rank",
    color: "#E7570F",
  },
  {
    image: "/assets/rank/legend.svg",
    rank: "legend",
    pool: "22%",
    level: "80 level",
    claim: "10000000 NFT Value",
    maxBuy: 50000000,
    requirement: "2 epic rank",
    color: "#E0475A",
  },
  {
    image: "/assets/rank/Super Legend.svg",
    rank: "super legend",
    pool: "25%",
    level: "100 level",
    claim: "50000000 NFT Value",
    maxBuy: 250000000,
    requirement: "2 legend rank",
    color: "#BE7DD8",
  },
  {
    image: "",
    rank: "Total",
    pool: "100%",
    level: "",
    claim: "",
    maxBuy: 0,
    requirement: "",
    color: "",
  },
  {
    image: "",
    rank: "TAX All Claim",
    pool: "10%",
    level: "",
    claim: "",
    maxBuy: 0,
    requirement: "",
    color: "white",
  },
];

export const TOKENOMICS = [
  { totalSupply: "reserves", percent: "20%", value: "20.000.000" },
  { totalSupply: "network swap", percent: "25%", value: "250.000.000" },
  { totalSupply: "team", percent: "20%", value: "200.000.000" },
  { totalSupply: "marketing", percent: "20%", value: "100.000.000" },
  {
    totalSupply: "Ecosystem Development Fund",
    percent: "15%",
    value: "150.000.000",
  },
];
