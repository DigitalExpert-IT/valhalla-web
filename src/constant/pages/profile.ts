import { t } from "i18next";

export const PROFILE_MEMBER = [
  { label: t("common.referrer"), value: 5 },
  { label: t("common.directReferrals"), value: 5 },
  { label: t("common.telegramOnlyMember"), value: "telegram" },
  { label: t("common.totalPotentialProfit"), value: 5 },
];

export const PROFILE_BALANCE = [
  { icon: "/images/exampleProfile.png", value: 100000000000000, label: "GNET" },
  { icon: "/images/exampleProfile.png", value: 100000000000000, label: "GNET" },
  { icon: "/images/exampleProfile.png", value: 100000000000000, label: "GNET" },
];

export const NETWORK_STATUS = [
  {
    label: t("pages.profile.networkStatus.TotalNetworkMember"),
    value: "20.000",
  },
  {
    label: t("pages.profile.networkStatus.Total15LevelReferral"),
    value: "20.000",
  },
  {
    label: t("pages.profile.networkStatus.PersonalBuy"),
    value: "20.000 GNET",
  },
  {
    label: t("pages.profile.networkStatus.Total100LevelReferral"),
    value: "20.000",
  },
];

export interface INetworkStatus {
  levelBonus: string;
  user: number;
  buy: number | string;
}

export const TABLE_NETWORK_STATUS = () => {
  const dataTable = [];
  for (let index = 1; index <= 100; index++) {
    dataTable.push({
      levelBonus: `level ${index}`,
      user: 9 * index,
      buy: "50.000",
    });
  }
  return dataTable;
};
