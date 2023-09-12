import { Home } from "../pages/Home";
import { Landing } from "../pages/Landing";

export type RouteData = {
  id: string;
  path: string;
  title?: string;
  element: any;
  visibleOnNavbar: boolean;
  navbarTitle?: string;
  noAuthNeeded?: boolean;
};

export const routes: Array<RouteData> = [
  {
    id: "landing",
    path: "/",
    element: Landing,
    title: "Landing",
    visibleOnNavbar: false,
    noAuthNeeded: true,
  },
  {
    id: "home",
    path: "/home",
    element: Home,
    title: "Home",
    visibleOnNavbar: true,
    navbarTitle: "Home",
    noAuthNeeded: false,
  },
];
