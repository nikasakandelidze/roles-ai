import { Route, Routes } from "react-router-dom";
import { RouteData, routes } from "./routes";
import { ThemeProvider } from "@mui/material";
import { theme } from "./common/styles";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{ height: "100vh", width: "100%", backgroundColor: "#FFFFFF" }}
      >
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
    </ThemeProvider>
  );
};

export default App;
