import { t } from "i18next";
export interface IRoadmap {
  name: string;
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
