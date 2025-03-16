import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";

export default [
    js.configs.recommended,
    {
        files: ["**/*.js"],
        ignores: ["node_modules/", "dist/", "build/"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
        },
        plugins: {
            import: importPlugin,
        },
        rules: {
            "indent": ["error", 4],
            "quotes": ["error", "double"],
            "semi": ["error", "always"],
            "no-unused-vars": ["warn"],
            "no-console": "off",
            "eqeqeq": ["error", "always"],
            "curly": ["error", "all"],
            "prefer-const": "error",
            "arrow-spacing": ["error", { "before": true, "after": true }],
        },
    },
];