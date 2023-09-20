import { Auth } from "../pages/Auth";
import { NotFound } from "../pages/NotFound";
import { Home } from "../pages/Home";
import { Landing } from "../pages/Landing";
import { Session } from "../pages/Session";

export type RestrictionType = "public" | "restricted" | "private";

export type RouteData = {
  id: string;
  path: string;
  title?: string;
  element: any;
  visibleOnNavbar: boolean;
  navbarTitle?: string;
  type: RestrictionType;
};

export const routes: Array<RouteData> = [
  {
    id: "landing",
    path: "/",
    element: Landing,
    title: "Landing",
    visibleOnNavbar: false,
    type: "public",
  },
  {
    id: "home",
    path: "/home",
    element: Home,
    title: "Home",
    visibleOnNavbar: true,
    navbarTitle: "Home",
    type: "private",
  },
  {
    id: "auth",
    path: "/auth",
    element: Auth,
    title: "Login",
    visibleOnNavbar: true,
    navbarTitle: "Login",
    type: "restricted",
  },
  {
    id: "session",
    path: "/session/:id",
    element: Session,
    title: "Session",
    visibleOnNavbar: false,
    type: "private",
  },
  {
    id: "notfound",
    path: "*",
    element: NotFound,
    title: "NotFound",
    visibleOnNavbar: false,
    type: "public",
  },
];
