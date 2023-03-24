import { t } from "i18next";
export interface IRoadmap {
  name: string;
  shades: string;
}

export interface IRoadmapV2 {
  shades: string;
}

export const ROADMAP: Array<IRoadmap> = [
  {
    name: "Q1 2022",
    shades: "teal",
  },
  {
    name: "Q2 2022",
    shades: "pink",
  },
  {
    name: "Q3 2022",
    shades: "green",
  },
  {
    name: "Q4 2022",
    shades: "blue",
  },
  {
    name: "Q1 2023",
    shades: "orange",
  },
];

export const ROADMAPV2: Array<IRoadmapV2> = [
  {
    shades: "#e93dcd ",
  },
  {
    shades: "#e33de6",
  },
  {
    shades: "#7b39c7",
  },
  {
    shades: "#7f2ead",
  },
  {
    shades: "#a230b7",
  },
  {
    shades: "#9d3de9",
  },
];
