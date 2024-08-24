import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    rules: {
      'no-unused-vars': 'off',
      'react/prop-types': 'off',
      'no-undef':'off',
    },
   },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];


// files: ['**/*.test.js', '**/*.spec.js', '**/*.test.ts', '**/*.spec.ts', '**/*.test.tsx', '**/*.spec.tsx']
