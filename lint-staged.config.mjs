const eslint = 'eslint --fix --cache --cache-location .cache/eslint/.eslintcache'
const prettier = 'prettier --write --cache --cache-location .cache/prettier/.prettiercache'
const stylelint = 'stylelint --fix --cache --cache-location .cache/stylelint/.stylelintcache'

const lintStagedConfig = {
  '**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx}': [eslint, prettier],
  '**/*.{json,md,yaml,yml}': [prettier],
  '**/*.css': [stylelint, prettier],
}

export default lintStagedConfig
