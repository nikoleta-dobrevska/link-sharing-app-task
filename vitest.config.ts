/* eslint-disable no-restricted-syntax */

/// <reference types="vitest/config" />

import { defineConfig, mergeConfig } from "vite";

import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["vitest.setup.ts"],
      include: ["**/*.{test,spec}.?(cm)[jt]s?(x)"],
      exclude: ["**/{node_modules,.git,dist}/**"],
      coverage: {
        provider: "v8",
        include: ["src/**/*.?(cm)[jt]s?(x)"],
        exclude: ["src/test-utils", "src/**/*.d.ts"],
      },
    },
  })
);
