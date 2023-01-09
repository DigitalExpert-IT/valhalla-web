import { t } from "i18next";

export const HEADER_IMAGE_DATA = [
  { uri: "/images/imgHeader1.png", alt: t("common.nftFarming") },
  { uri: "/images/imgHeader2.png", alt: t("common.shareToEarn") },
  { uri: "/images/imgHeader3.png", alt: t("common.royaltyProperty") },
  { uri: "/images/imgHeader4.png", alt: t("common.metaverseProject") },
];

export const OURTEAM = [
  {
    name: "Yosa Agung Hindarto",
    image: "https://i.pravatar.cc/150?img=13",
    division: "Chief Executive Officer",
  },
  {
    name: "Abdul Manan",
    image: "https://i.pravatar.cc/150?img=61",
    division: "Chief Executive Officer",
  },
];

export const PARTNERSHIP = [
  {
    name: "partner1",
    image: "/assets/partnership/partner1.png",
  },
  {
    name: "partner2",
    image: "/assets/partnership/partner2.png",
  },
  {
    name: "partner3",
    image: "/assets/partnership/partner3.png",
  },
  {
    name: "partner4",
    image: "/assets/partnership/partner4.png",
  },
];

export interface IRankBonus {
  image: string;
  rank: string;
  bonus: string;
  requirement: number;
  color: string;
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

export const RANKBONUS = [
  {
    image: "/assets/rank/norank2.svg",
    rank: "no rank",
    bonus: "0",
    requirement: 100,
    color: "white",
  },
  {
    image: "/assets/rank/common.svg",
    rank: "common",
    bonus: "5%",
    requirement: 100,
    color: "#A8742F",
  },
  {
    image: "/assets/rank/rare.svg",
    rank: "rare",
    bonus: "13%",
    requirement: 400,
    color: "#666768",
  },
  {
    image: "/assets/rank/super-rare.svg",
    rank: "super rare",
    bonus: "16%",
    requirement: 1600,
    color: "#2A7FB8",
  },
  {
    image: "/assets/rank/epic.svg",
    rank: "epic",
    bonus: "19%",
    requirement: 6400,
    color: "#E7570F",
  },
  {
    image: "/assets/rank/legend.svg",
    rank: "legend",
    bonus: "22%",
    requirement: 16000,
    color: "#E0475A",
  },
  {
    image: "/assets/rank/super-legend.svg",
    rank: "super legend",
    bonus: "25%",
    requirement: 64000,
    color: "#BE7DD8",
  },
  {
    image: "",
    rank: "Total",
    bonus: "100%",
    requirement: 0,
    color: "",
  },
  {
    image: "",
    rank: "TAX All Claim",
    bonus: "100%",
    requirement: 0,
    color: "white",
  },
];

export const TOKENOMICS = [
  { totalSupply: "reserves", percent: "10%", value: "10.000.000" },
  { totalSupply: "network swap", percent: "65%", value: "65.000.000" },
  { totalSupply: "team", percent: "10%", value: "10.000.000" },
  { totalSupply: "marketing", percent: "10%", value: "10.000.000" },
  {
    totalSupply: "Ecosystem Development Fund",
    percent: "5%",
    value: "5.000.000",
  },
];
