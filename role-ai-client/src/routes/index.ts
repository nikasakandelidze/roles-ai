import { Auth } from "../pages/Auth";
import { NotFound } from "../pages/NotFound";
import { Home } from "../pages/Home";
import { Landing } from "../pages/Landing";
import { Session } from "../pages/Session";
import { AuthButton } from "../components/navbar/AuthButton";
import { SessionHistory } from "../pages/SessionHistory";

export type RestrictionType = "public" | "restricted" | "private";

export type RouteData = {
  id: string;
  path: string;
  title?: string;
  element: any;
  visibleOnNavbar: boolean;
  navbarTitle?: string;
  type: RestrictionType;
  navbarElement?: any;
};

export const routes: Array<RouteData> = [
  {
    id: "landing",
    path: "/",
    element: Landing,
    title: "Landing",
    visibleOnNavbar: true,
    type: "restricted",
    navbarTitle: "Home",
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
  {
    id: "sessionHistory",
    path: "/session-history",
    element: SessionHistory,
    title: "Sessions History",
    visibleOnNavbar: true,
    type: "private",
    navbarTitle: "Sessions History",
  },
  {
    id: "auth",
    path: "/auth",
    element: Auth,
    title: "Login",
    visibleOnNavbar: true,
    navbarTitle: "Get Started",
    type: "restricted",
    navbarElement: AuthButton,
  },
];
