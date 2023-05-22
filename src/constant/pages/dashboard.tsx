import {
  BsFillHouseDoorFill,
  BsFillCalendarEventFill,
  BsFillCollectionFill,
  BsFillWalletFill,
  BsClockHistory,
  BsFillGearFill,
} from "react-icons/bs";

export const DASHBOARD_CATEGORY = [
  {
    name: "Menu",
    menus: [
      {
        key: "dashboard",
        name: "dashboard",
        icon: <BsFillHouseDoorFill size={24} />,
        href: (address: string) => `/dashboard/admin/${address}`,
      },
      {
        key: "event",
        name: "event",
        icon: <BsFillCalendarEventFill size={20} />,
        href: "/event",
      },
    ],
  },
  {
    name: "Setting",
    menus: [
      {
        key: "my-collection",
        name: "myCollection",
        icon: <BsFillCollectionFill size={24} />,
        href: "/my-collection",
      },
      {
        key: "wallet",
        name: "wallet",
        icon: <BsFillWalletFill size={24} />,
        href: "/wallet",
      },
      {
        key: "history",
        name: "history",
        icon: <BsClockHistory size={24} />,
        href: "/history",
      },
      {
        key: "settings",
        name: "settings",
        icon: <BsFillGearFill size={24} />,
        href: "/settings",
      },
    ],
  },
];
