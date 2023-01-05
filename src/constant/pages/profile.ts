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
    start: ["Global Bonus"],
    end: [100000000000000, "MATIC"],
  },
  {
    start: ["Referral Bonus", "1000000000000000000000000000 MATIC"],
    end: "claim",
  },
  {
    start: ["Rank Reward", "0 MATIC"],
    end: "claim",
  },
  {
    start: ["Global Bonus"],
    end: [33, "MATIC"],
  },
];
