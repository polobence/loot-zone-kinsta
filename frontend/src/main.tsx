import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StratusProvider } from "@kinsta/stratus";
import { ThemeProvider } from "@emotion/react";

import App from "./App";
import { theme } from "./theme/theme.ts";
import { GlobalStyles } from "./theme/GlobalStyles";
import { CartProvider } from "./context/cart/CartProvider.tsx";
import { AuthProvider } from "./context/auth/AuthProvider.tsx";
import { NotificationProvider } from "./context/notification/NotificationProvider.tsx";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./lib/apolloClient.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <StratusProvider language="en">
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <NotificationProvider>
            <CartProvider>
              <AuthProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </AuthProvider>
            </CartProvider>
          </NotificationProvider>
        </ThemeProvider>
      </StratusProvider>
    </ApolloProvider>
  </StrictMode>,
);
