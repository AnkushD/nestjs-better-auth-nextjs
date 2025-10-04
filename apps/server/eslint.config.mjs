// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',

      // TypeScript sorting rules
      '@typescript-eslint/sort-type-constituents': 'error',

      // Import ordering rules
      'import/order': [
        'warn',
        {
          groups: [
            'builtin', // Node.js built-in modules
            'external', // npm packages
            'internal', // Internal modules (controllers, modules, dtos)
            'parent', // Parent directories
            'sibling', // Same directory
            'index', // Index files
          ],
          //'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
            // Controllers - first in internal group
            {
              pattern: '**/*.controller',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: './*.controller',
              group: 'internal',
              position: 'before',
            },
            // Modules - after controllers
            {
              pattern: '**/*.module',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: './*.module',
              group: 'internal',
              position: 'before',
            },
            // Services - after modules
            {
              pattern: '**/*.service',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: './*.service',
              group: 'internal',
              position: 'before',
            },
            // Schemas - before DTOs
            {
              pattern: '**/schema/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '../**/schema',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '**/database/schema',
              group: 'internal',
              position: 'before',
            },
            // DTOs - last in internal group
            {
              pattern: '**/dto/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: './dto/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: './dto',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          warnOnUnassignedImports: false,
        },
      ],
      'import/first': 'error', // Ensure imports come first
      'import/newline-after-import': 'error', // Newline after imports
      'import/no-duplicates': 'error', // No duplicate imports
      'import/no-unresolved': 'off', // TypeScript handles this
      'import/named': 'off', // TypeScript handles this
      'import/default': 'off', // TypeScript handles this
      'import/namespace': 'off', // TypeScript handles this
    },
    plugins: {
      import: importPlugin,
    },
  },
);
