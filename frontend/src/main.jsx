import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import theme from "./theme.js";

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </StyledEngineProvider>
    </React.StrictMode>
);