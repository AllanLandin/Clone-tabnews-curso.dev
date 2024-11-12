import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginJest from "eslint-plugin-jest";
import babelParser from "@babel/eslint-parser";

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  { ignores: ["**/.next/**"] },
  {
    files: ["**/*.{js,mjs,cjs,jsx}", "**/*.test.js"],
    plugins: { jest: pluginJest, js: pluginJs, react: pluginReact },
    rules: {
      ...pluginJest.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
        requireConfigFile: false,
      },
      globals: {
        ...globals.jest,
        ...globals.browser,
        ...globals.node,
      },
    },
  },
];
