/* eslint-disable import/no-named-as-default-member */

import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import { globalIgnores } from "eslint/config";
import pluginImport from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      pluginImport.flatConfigs.recommended,
      pluginImport.flatConfigs.typescript,
    ],
    plugins: {
      "@stylistic": stylistic,
      "simple-import-sort": simpleImportSort,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // eslint
      "no-restricted-syntax": [
        "error",
        {
          selector: "ImportDeclaration[source.value=/^\\.{1,2}(?!.*\\.s?css)/]",
          message: 'Use absolute "@/" imports instead of relative ones.',
        },
      ],
      "no-console": "error",

      // @stylistic
      "@stylistic/jsx-self-closing-comp": "error",

      // eslint-plugin-import
      "import/no-deprecated": "error",
      "import/no-relative-parent-imports": "error",
      "import/no-empty-named-blocks": "error",
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: ["*.{js,ts}"],
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],
      "import/no-mutable-exports": "error",
      "import/enforce-node-protocol-usage": ["error", "always"],
      "import/no-useless-path-segments": ["error", { noUselessIndex: true }],
      "import/first": "error",
      "import/no-namespace": "error",

      // eslint-plugin-simple-import-sort
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Node.js packages
            ["^node:"],
            // External packages
            ["^"],
            // Internal packages
            ["^@/"],
            // Style imports
            ["^.*\\.s?css$"],
            // Relative imports
            ["^\\."],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
    settings: {
      "import/resolver": { typescript: true, node: true },
    },
  },
]);
