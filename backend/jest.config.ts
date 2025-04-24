import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";
import { Config } from "jest";

/** @type {import('ts-jest').JestConfigWithTsJest} **/
const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",

  clearMocks: true,

  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/modules/**/services/*.ts"],
  coverageDirectory: "coverage",

  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },

  moduleFileExtensions: ["ts", "js", "json"],

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),

  testMatch: ["**/*.test.ts"],
};

export default config;
