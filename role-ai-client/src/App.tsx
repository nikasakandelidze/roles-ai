import { Route, Routes, useLocation } from "react-router-dom";
import { RouteData, routes } from "./routes";
import { ThemeProvider } from "@mui/material";
import { theme } from "./common/styles";
import { SnackbarProvider } from "notistack";
import { Navigation } from "./components/navbar";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { userStore } from "./state/user";
import { ProtectedRoute } from "./routes/ProtectedRoute";

const App = observer(() => {
  console.log(process.env);
  useEffect(() => {
    userStore.checkToken();
  }, []);

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
          <div style={{ display: "flex" }}>{<Navigation />}</div>
          <div style={{ display: "flex", flex: 1, width: "100%" }}>
            {userStore.initialUserCheckStatus === "FINISHED" && (
              <Routes>
                {routes.map((route: RouteData) => (
                  <Route
                    key={route.id}
                    path={route.path}
                    element={
                      route.type === "public" ? (
                        <route.element />
                      ) : route.type === "private" ? (
                        <ProtectedRoute restriction={userStore.user == null}>
                          <route.element />
                        </ProtectedRoute>
                      ) : (
                        <ProtectedRoute
                          restriction={userStore.user != null}
                          redirect="/home"
                        >
                          <route.element />
                        </ProtectedRoute>
                      )
                    }
                  />
                ))}
              </Routes>
            )}
          </div>
        </div>
      </ThemeProvider>
    </SnackbarProvider>
  );
});

export default App;
