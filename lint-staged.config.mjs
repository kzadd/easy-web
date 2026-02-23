const eslint = 'eslint --fix --cache --cache-location .cache/eslint/.eslintcache'
const prettier = 'prettier --write'

const lintStagedConfig = {
  '**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx}': [eslint, prettier],
  '**/*.{json,md,yaml,yml}': [prettier],
  '**/*.css': [prettier],
}

export default lintStagedConfig
