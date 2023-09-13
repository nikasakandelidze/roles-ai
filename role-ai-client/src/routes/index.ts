import { Auth } from "../pages/Auth";
import { Home } from "../pages/Home";
import { Landing } from "../pages/Landing";

export type RouteData = {
  id: string;
  path: string;
  title?: string;
  element: any;
  visibleOnNavbar: boolean;
  navbarTitle?: string;
};

export const routes: Array<RouteData> = [
  {
    id: "landing",
    path: "/",
    element: Landing,
    title: "Landing",
    visibleOnNavbar: false,
  },
  {
    id: "home",
    path: "/home",
    element: Home,
    title: "Home",
    visibleOnNavbar: true,
    navbarTitle: "Home",
  },
  {
    id: "auth",
    path: "/auth",
    element: Auth,
    title: "Login",
    visibleOnNavbar: true,
    navbarTitle: "Login",
  },
];
