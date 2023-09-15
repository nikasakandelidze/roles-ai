import { Route, Routes, useLocation } from "react-router-dom";
import { RouteData, routes } from "./routes";
import { ThemeProvider } from "@mui/material";
import { theme } from "./common/styles";
import { SnackbarProvider } from "notistack";
import { Navigation } from "./components/navbar";

const App = () => {
  const { pathname } = useLocation();

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
};

export default App;
