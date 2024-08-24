import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    rules: {
      'no-unused-vars': 'off',
      'react/prop-types': 'off',
      'react/jsx-no-undef': 'off',
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];


// files: ['**/*.test.js', '**/*.spec.js', '**/*.test.ts', '**/*.spec.ts', '**/*.test.tsx', '**/*.spec.tsx']
// rules: {
//   'react/display-name': 2,
//   'react/jsx-key': 2,
//   'react/jsx-no-comment-textnodes': 2,
//   'react/jsx-no-duplicate-props': 2,
//   'react/jsx-no-target-blank': 2,
//   'react/jsx-no-undef': 2,
//   'react/jsx-uses-react': 2,
//   'react/jsx-uses-vars': 2,
//   'react/no-children-prop': 2,
//   'react/no-danger-with-children': 2,
//   'react/no-deprecated': 2,
//   'react/no-direct-mutation-state': 2,
//   'react/no-find-dom-node': 2,
//   'react/no-is-mounted': 2,
//   'react/no-render-return-value': 2,
//   'react/no-string-refs': 2,
//   'react/no-unescaped-entities': 2,
//   'react/no-unknown-property': 2,
//   'react/no-unsafe': 0,
//   'react/prop-types': 2,
//   'react/react-in-jsx-scope': 2,
//   'react/require-render-return': 2,
// },