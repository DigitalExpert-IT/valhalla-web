import {
  BsFillHouseDoorFill,
  BsFillCalendarEventFill,
  BsPeopleFill,
  BsTropicalStorm,
} from "react-icons/bs";

export const DASHBOARD_CATEGORY = [
  {
    name: "Menu",
    menus: [
      {
        key: "dashboard",
        name: "dashboard",
        icon: <BsFillHouseDoorFill size={24} />,
        href: "/dashboard",
      },
      {
        key: "event",
        name: "event",
        icon: <BsFillCalendarEventFill size={20} />,
        href: "/event",
      },
      {
        key: "nft",
        name: "nft",
        icon: <BsTropicalStorm size={20} />,
        href: "/nft",
      },
      {
        key: "user",
        name: "user",
        icon: <BsPeopleFill size={20} />,
        href: "/user",
      },
    ],
  },
];

export const DASHBOARD_ADMIN_CATEGORY = [
  {
    name: "Menu",
    menus: [
      {
        key: "dashboard",
        name: "dashboard",
        icon: <BsFillHouseDoorFill size={24} />,
        href: "/dashboard",
      },
      {
        key: "nft",
        name: "nft",
        icon: <BsTropicalStorm size={20} />,
        href: "/nft",
      },
      {
        key: "user",
        name: "user",
        icon: <BsPeopleFill size={20} />,
        href: "/user",
      },
    ],
  },
];
