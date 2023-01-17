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
    end: [100000000000000, t("common.matic")],
  },
  {
    start: [
      t("common.referralBonus"),
      "1000000000000000000000000000 " + t("common.matic"),
    ],
    end: "claim",
  },
  {
    start: [t("common.rankReward"), `0 ${t("common.matic")}`],
    end: "claim",
  },
  {
    start: [t("common.globalBonus")],
    end: [33, t("common.matic")],
  },
];

export const NETWORK_STATUS = [
  {
    start: [t("common.totalNetworkMembers")],
    end: ["2000"],
  },
  {
    start: [t("common.total15LevelReferral")],
    end: ["2000"],
  },
  {
    start: [t("common.personalBuy")],
    end: ["2000", t("common.gnet")],
  },
  {
    start: [t("common.total100LevelReferral")],
    end: ["2000"],
  },
]

export interface INetworkStatus {
  levelBonus: string;
  user: string;
  buy: number;
}

export const TABLE_NETWORK_STATUS = () => {
  const dataTable = [];
  for (let index = 1; index <= 100; index++) {
    dataTable.push({
      levelBonus: `level ${index}`,
      user: 9 * index,
      buy: 5000 * index,
    })
  }
  return dataTable
};
