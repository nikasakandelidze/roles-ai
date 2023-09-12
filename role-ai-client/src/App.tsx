import React from "react";
import { Route, Routes } from "react-router-dom";
import { RouteData, routes } from "./routes";

const App = () => {
    return (
        <div
            className="App"
            style={{
                height: "100vh",
                width: "100%",
            }}
        >
            <Routes>
                {routes.map((route: RouteData) => (
                    <Route
                        key={route.id}
                        path={route.path}
                        element={route.element}
                    />
                ))}
            </Routes>
        </div>
    );
};

export default App;
