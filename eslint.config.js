/* eslint-disable import/no-named-as-default-member */

import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import { globalIgnores } from "eslint/config";
import pluginImport from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
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
      jsxA11y.flatConfigs.recommended,
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
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // eslint
      "no-console": "error",
      "no-duplicate-imports": "off",
      "no-restricted-syntax": [
        "error",
        {
          selector: "ImportDeclaration[source.value=/^\\.{1,2}(?!.*\\.s?css)/]",
          message: 'Use absolute "@/" imports instead of relative ones.',
        },
      ],

      // typescript-eslint
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          disallowTypeAnnotations: true,
          fixStyle: "inline-type-imports",
          prefer: "type-imports",
        },
      ],

      // @stylistic/eslint-plugin
      "@stylistic/jsx-self-closing-comp": "error",

      // eslint-plugin-jsx-a11y
      "jsx-a11y/label-has-for": "error",

      // eslint-plugin-import
      "import/no-deprecated": "error",
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
      "import/consistent-type-specifier-style": ["error", "prefer-inline"],
      "import/first": "error",
      "import/no-duplicates": [
        "error",
        { considerQueryString: true, "prefer-inline": true },
      ],
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
      "jsx-a11y": {
        polymorphicPropName: "component",
      },
      "import/resolver": { typescript: true, node: true },
    },
  },
]);
