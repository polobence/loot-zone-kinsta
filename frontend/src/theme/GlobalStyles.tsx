import { Global, css } from "@emotion/react";

export function GlobalStyles() {
  return (
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background-color: #f5f5f5;
          margin-left: 2rem;
          margin-right: 2rem;
        }

        h1 {
          margin-bottom: 1.5rem;
        }
      `}
    />
  );
}
