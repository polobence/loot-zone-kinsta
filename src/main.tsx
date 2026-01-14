import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StratusProvider } from "@kinsta/stratus";
import { ThemeProvider } from "@emotion/react";

import App from "./App";
import { theme } from "./theme/theme.ts";
import { GlobalStyles } from "./theme/GlobalStyles";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StratusProvider language="en">
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </StratusProvider>
  </StrictMode>
);
