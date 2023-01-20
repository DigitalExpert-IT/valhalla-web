import { Table } from "@chakra-ui/react";
import { t } from "i18next";

export const PROFILE_MEMBER = [
  { label: t("common.referrer"), value: 5 },
  { label: t("common.directReferrals"), value: 5 },
  { label: t("common.telegramOnlyMember"), value: "telegram" },
];

export const PROFILE_BALANCE = [
  { icon: "/images/exampleProfile.png", value: 100000000000000, label: "GNET" },
  { icon: "/images/exampleProfile.png", value: 100000000000000, label: "GNET" },
  { icon: "/images/exampleProfile.png", value: 100000000000000, label: "GNET" },
];

export const PROFILE_WIDGET = [
  {
    start: [t("common.globalBonus")],
    end: [100000000000000, "MATIC"],
  },
  {
    start: [
      t("common.referralBonus"),
      "1000000000000000000000000000 " + "MATIC",
    ],
    end: "claim",
  },
  {
    start: [t("common.rankReward"), `0 ${"MATIC"}`],
    end: "claim",
  },
  {
    start: [t("common.globalBonus")],
    end: [33, "MATIC"],
  },
];

export const NETWORK_STATUS = [
  {
    label: t("common.totalNetworkMembers"),
    value: "2000",
  },
  {
    label: t("common.total15LevelReferral"),
    value: "2000",
  },
  {
    label: t("common.personalBuy"),
    value: "2000",
    isValueLabel: true
  },
  {
    label: t("common.total100LevelReferral"),
    value: "2000",
  },
];

export interface INetworkStatus {
  levelBonus: string;
  user: number;
  buy: number;
}

export const TABLE_NETWORK_STATUS = () => {
  const dataTable = [];
  for (let index = 1; index <= 100; index++) {
    dataTable.push({
      levelBonus: `level ${index}`,
      user: 9 * index,
      buy: 5000 * index,
    });
  }
  return dataTable;
};
