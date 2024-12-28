import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';

/** @type {import('eslint').Linter.Config[]} */
export default [
    // Good to know why ignores have to set without any other properties
    // https://github.com/eslint/eslint/discussions/18304#discussioncomment-11430158
    {
        ignores: [
            '.astro/**/*',
            'dist/**/*',
            'src/env.d.ts',
            'tailwind.config.cjs',
            'public/cookieconsent.js'
        ]
    },
    {
        files: ['**/*.{js,mjs,cjs,ts}']
    },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...eslintPluginAstro.configs.recommended
];
