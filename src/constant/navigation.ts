import { BsFacebook, BsTwitter } from "react-icons/bs";
import { IconType } from "react-icons/lib";

export interface INavChild {
  title: string;
  link: string;
}
export interface INavigation {
  name: string;
  href?: string;
  children?: INavChild[];
}

export interface ISocial {
  name: string;
  href: string;
  icon: IconType;
}

export const NAVIGATION: Array<INavigation> = [
  {
    name: "home",
    href: "/",
  },
  {
    name: "project",
    children: [
      {
        title: "nftFarming",
        link: "/nft-farming",
      },
      {
        title: "genesis",
        link: "/genesis",
      },
      {
        title: "sharetoearn",
        link: "/share",
      },
    ],
  },
  {
    name: "swap",
    href: "/swap",
  },
  {
    name: "profile",
    href: "/profile",
  },
  {
    name: "myNetwork",
    href: "/dashboard-v2/[address]",
  },
];

export const SOCIAL: Array<ISocial> = [
  {
    name: "facebook",
    href: "#",
    icon: BsFacebook,
  },
  {
    name: "Twitter",
    href: "#",
    icon: BsTwitter,
  },
];
