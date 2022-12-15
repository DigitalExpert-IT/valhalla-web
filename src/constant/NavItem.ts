export interface INav {
  name: string;
  href: string;
}

export const NavItem: Array<INav> = [
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
