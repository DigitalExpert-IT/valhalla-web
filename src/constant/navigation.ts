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
    name: "features",
    href: "/features",
  },
  {
    name: "projects",
    href: "/projects",
  },
];

export const SOCIAL: Array<ISocial> = [
  {
    name: "instagram",
    href: "#",
    icon: BsInstagram,
  },
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