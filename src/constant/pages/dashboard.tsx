import { BsFillHouseDoorFill, BsTropicalStorm } from "react-icons/bs";

export const DASHBOARD_CATEGORY = [
  {
    name: "Menu",
    menus: [
      {
        key: "dashboard",
        name: "myNetwork",
        icon: <BsFillHouseDoorFill size={24} />,
        href: "/dashboard-v2/[address]",
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
        name: "myNetwork",
        icon: <BsFillHouseDoorFill size={24} />,
        href: "/admin/dashboard",
      },
      {
        key: "nft",
        name: "nft",
        icon: <BsTropicalStorm size={20} />,
        href: "/admin/nft",
      },
      // {
      //   key: "user",
      //   name: "user",
      //   icon: <BsPeopleFill size={20} />,
      //   href: "/admin/user",
      // },
    ],
  },
];
