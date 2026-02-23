/** @type {import("prettier").Config} */
const prettierConfig = {
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: 'lf',
  plugins: ['prettier-plugin-tailwindcss'],
  printWidth: 100,
  quoteProps: 'as-needed',
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  tailwindFunctions: ['cn', 'clsx', 'cva', 'tw'],
  trailingComma: 'all',
  useTabs: false,
}

export default prettierConfig
