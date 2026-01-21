import type { Preview } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import type { ReactNode } from "react";

const preview: Preview = {
  decorators: [
    (Story: () => ReactNode) =>
      React.createElement(MemoryRouter, { initialEntries: ["/"] }, React.createElement(Story)),
  ],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
