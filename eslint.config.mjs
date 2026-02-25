import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import nx from '@nx/eslint-plugin'
import prettier from 'eslint-config-prettier/flat'
import importPlugin from 'eslint-plugin-import'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

const globalIgnores = {
  ignores: [
    '**/*.log',
    '**/*.tsbuildinfo',
    '**/.cache/**',
    '**/.next/**',
    '**/.nx/**',
    '**/.swc/**',
    '**/.vercel/**',
    '**/.vitest/**',
    '**/build/**',
    '**/coverage/**',
    '**/dist/**',
    '**/node_modules/**',
    '**/out-tsc/**',
    '**/out/**',
    '**/tmp/**',
    '**/vitest.config.*.timestamp*',
  ],
}

const customBlock = {
  files: ['**/*.{js,jsx,mjs,mts,ts,tsx}'],
  rules: {
    'block-scoped-var': 'error',
    'default-case': 'error',
    eqeqeq: ['error', 'always'],
    'max-params': ['error', 3],
    'no-alert': 'error',
    'no-console': [
      'warn',
      {
        allow: ['error', 'warn'],
      },
    ],
    'no-dupe-keys': 'error',
    'no-duplicate-imports': 'error',
    'no-lonely-if': 'error',
    'no-unreachable': 'error',
    'no-use-before-define': 'error',
    'object-shorthand': ['warn', 'always'],
    'prefer-template': 'warn',
  },
}

const importBlock = {
  files: ['**/*.{js,jsx,mjs,mts,ts,tsx}'],
  plugins: {
    import: fixupPluginRules(importPlugin),
    'simple-import-sort': simpleImportSort,
  },
  rules: {
    'import/newline-after-import': 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^\\u0000'],
          ['^node:'],
          ['^react$', '^react/', '^next$', '^next/', '^@?(?!easy-web)\\w'],
          ['^@easy-web/'],
          ['^\\.'],
          ['^.+\\.css$'],
        ],
      },
    ],
  },
}

const nextReactBlock = [
  ...fixupConfigRules(compat.extends('next')),
  ...fixupConfigRules(compat.extends('next/core-web-vitals')),
].map((config) => ({
  ...config,
  files: ['**/*.{js,jsx,ts,tsx}'],
  rules: {
    ...config.rules,
    'react/jsx-boolean-value': ['warn', 'never'],
    'react/jsx-curly-brace-presence': [
      'warn',
      {
        children: 'never',
        props: 'never',
      },
    ],
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-sort-props': [
      'warn',
      {
        callbacksLast: false,
        ignoreCase: true,
        noSortAlphabetically: false,
        shorthandFirst: false,
        shorthandLast: false,
      },
    ],
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'warn',
  },
}))

const nxBoundariesBlock = {
  files: ['**/*.{js,jsx,mjs,mts,ts,tsx}'],
  rules: {
    '@nx/enforce-module-boundaries': [
      'error',
      {
        allow: [
          '^.*/eslint.config\\.m?[jt]s$',
          '^.*/postcss.config\\.m?[jt]s$',
          '^.*/stylelint.config\\.m?[jt]s$',
          '^.*/vitest.config\\.m?[jt]s$',
        ],
        depConstraints: [
          {
            onlyDependOnLibsWithTags: ['*'],
            sourceTag: '*',
          },
        ],
        enforceBuildableLibDependency: true,
      },
    ],
  },
}

const typescriptBlock = {
  files: ['**/*.{js,jsx,mjs,mts,ts,tsx}'],
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        fixStyle: 'inline-type-imports',
        prefer: 'type-imports',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-useless-empty-export': 'error',
  },
}

/**
 * @type {import('eslint').Linter.Config[]}
 */
const eslintConfig = [
  globalIgnores,
  ...nx.configs['flat/base'],
  ...nx.configs['flat/javascript'],
  ...nx.configs['flat/typescript'],
  ...nextReactBlock,
  typescriptBlock,
  importBlock,
  nxBoundariesBlock,
  customBlock,
  prettier,
]

export default eslintConfig
