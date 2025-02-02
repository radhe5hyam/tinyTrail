import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.ts", "**/*.tsx"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "next"], // Add "next" plugin
    extends: [
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking",
      "plugin:next/recommended", // Add this line
    ],
    parserOptions: {
      project: "./tsconfig.json",
      ecmaVersion: 2020,
      sourceType: "module",
    },
  },
];

export default eslintConfig;
