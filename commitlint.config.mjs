import { existsSync, readdirSync } from 'fs'

const getDirectories = (source) => {
  if (!existsSync(source)) return []

  return readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && !dirent.name.startsWith('.'))
    .map((dirent) => dirent.name)
}

const scopes = {
  apps: getDirectories('apps'),
  libs: getDirectories('libs'),
  workspace: ['ci', 'config', 'deps', 'root'],
}

const allScopes = Object.entries(scopes).flatMap(([group, scopes]) =>
  scopes.map((scope) => `${group}:${scope}`),
)

/**
 * @type {import('@commitlint/types').UserConfig}
 */
const commitlintConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 100],
    'scope-case': [0],
    'scope-empty': [2, 'never'],
    'scope-enum': [2, 'always', allScopes],
    'subject-case': [2, 'never', ['pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'refactor', 'revert', 'style', 'test'],
    ],
  },
}

export default commitlintConfig
