import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/src/test/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: ["/node_modules/(?!(?:@kinsta/stratus|@emotion)/)"],
  globals: {
    "ts-jest": {
      useESM: true,
      tsconfig: {
        jsx: "react-jsx",
        esModuleInterop: true,
      },
    },
  },
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest",
    "^.+\\.js$": "babel-jest",
  },
};

export default config;
