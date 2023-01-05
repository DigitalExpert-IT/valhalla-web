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
}

export const RANKBONUS = [
  {
    image: "/assets/rank/common.svg",
    rank: "no rank",
    bonus: "0",
    requirement: 100,
  },
  {
    image: "/assets/rank/common.svg",
    rank: "common",
    bonus: "5%",
    requirement: 100,
  },
  {
    image: "/assets/rank/rare.svg",
    rank: "rare",
    bonus: "13%",
    requirement: 400,
  },
  {
    image: "/assets/rank/super-rare.svg",
    rank: "super rare",
    bonus: "16%",
    requirement: 1600,
  },
  {
    image: "/assets/rank/epic.svg",
    rank: "epic",
    bonus: "19%",
    requirement: 6400,
  },
  {
    image: "/assets/rank/legend.svg",
    rank: "legend",
    bonus: "22%",
    requirement: 16000,
  },
  {
    image: "/assets/rank/super-legend.svg",
    rank: "super legend",
    bonus: "25%",
    requirement: 64000,
  },
  {
    image: "",
    rank: "Total",
    bonus: "100%",
    requirement: 0,
  },
  {
    image: "",
    rank: "TAX All Claim",
    bonus: "100%",
    requirement: 0,
  },
];
