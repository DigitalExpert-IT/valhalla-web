import { BsInstagram, BsFacebook, BsTwitter } from "react-icons/bs";
import { IconType } from "react-icons/lib";
export interface INavigation {
  name: string;
  href: string;
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
    name: "swap",
    href: "/swap",
  },
  {
    name: "profile",
    href: "/profile",
  },
  {
    name: "nftfarming",
    href: "/nft-farming",
  },
  {
    name: "sharetoearn",
    href: "/share",
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
