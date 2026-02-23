import next from '@next/eslint-plugin-next'
import nx from '@nx/eslint-plugin'
import prettier from 'eslint-config-prettier/flat'
import importPlugin from 'eslint-plugin-import'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const globalIgnores = {
  ignores: [
    '**/*.tsbuildinfo',
    '**/.cache/**',
    '**/.next/**',
    '**/.nx/**',
    '**/.swc/**',
    '**/build/**',
    '**/coverage/**',
    '**/dist/**',
    '**/node_modules/**',
    '**/out/**',
    '**/tmp/**',
  ],
}

const customBlock = {
  files: ['**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx}'],
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
    'sort-keys': [
      'warn',
      'asc',
      {
        caseSensitive: false,
        minKeys: 2,
        natural: true,
      },
    ],
  },
}

const importBlock = {
  files: ['**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx}'],
  plugins: {
    import: importPlugin,
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
          ['^react$', '^react/', '^next$', '^next/'],
          ['^@?(?!easy-web)\\w'],
          ['^@easy-web/'],
          ['^\\.'],
          ['^.+\\.css$'],
        ],
      },
    ],
  },
}

const nextBlock = {
  files: ['apps/**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx}'],
  plugins: {
    '@next/next': next,
  },
  rules: {
    ...next.configs.recommended.rules,
    ...next.configs['core-web-vitals'].rules,
  },
}

const nxBoundariesBlock = {
  files: ['**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx}'],
  rules: {
    '@nx/enforce-module-boundaries': [
      'error',
      {
        allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
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

const reactBlock = {
  files: ['**/*.{jsx,tsx}'],
  plugins: {
    react,
    'react-hooks': reactHooks,
  },
  rules: {
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
  settings: {
    react: {
      version: 'detect',
    },
  },
}

const typescriptBlock = {
  files: ['**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx}'],
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

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  globalIgnores,
  ...nx.configs['flat/base'],
  ...nx.configs['flat/javascript'],
  ...nx.configs['flat/typescript'],
  importBlock,
  nxBoundariesBlock,
  nextBlock,
  typescriptBlock,
  reactBlock,
  customBlock,
  prettier,
]

export default eslintConfig
