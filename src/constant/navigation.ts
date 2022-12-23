export interface INavigation {
  name: string;
  href: string;
}

export const navigation: Array<INavigation> = [
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
