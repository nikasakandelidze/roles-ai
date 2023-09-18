import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { RouteData, routes } from "./routes";
import { ThemeProvider } from "@mui/material";
import { theme } from "./common/styles";
import { SnackbarProvider } from "notistack";
import { Navigation } from "./components/navbar";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { userStore } from "./state/user";

const App = observer(() => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    userStore.checkToken();
  }, []);

  useEffect(() => {
    if (userStore.initialUserCheckStatus === "FINISHED" && !userStore.user) {
      navigate("/auth");
    }
  }, [userStore.initialUserCheckStatus, userStore.user]);

  return (
    <SnackbarProvider autoHideDuration={1500}>
      <ThemeProvider theme={theme}>
        <div
          style={{
            height: "100vh",
            width: "100%",
            backgroundColor: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex" }}>
            {pathname.toLowerCase() !== "/auth" &&
              pathname.toLowerCase() !== "/" && <Navigation />}
          </div>
          <div style={{ display: "flex", flex: 1, width: "100%" }}>
            <Routes>
              {routes.map((route: RouteData) => (
                <Route
                  key={route.id}
                  path={route.path}
                  element={<route.element />}
                />
              ))}
            </Routes>
          </div>
        </div>
      </ThemeProvider>
    </SnackbarProvider>
  );
});

export default App;
