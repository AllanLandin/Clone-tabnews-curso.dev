import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginJest from "eslint-plugin-jest";
import babelParser from "@babel/eslint-parser";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["**/.next/**"],
    files: ["**/*.{js,mjs,cjs,jsx}", "**/*.test.js"],
    plugins: { jest: pluginJest, js: pluginJs, react: pluginReact },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      ...pluginJest.configs.recommended.rules,
      ...pluginJs.configs.recommended.rules,
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
        ecmaVersion: 2020, // Define a versão ECMAScript
        sourceType: "module", // Permite módulos ES6
        ecmaFeatures: {
          jsx: true, // Habilita o suporte a JSX
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
