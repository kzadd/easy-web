import { defineWorkspace } from 'vitest/config'

/**
 * @type {import('vitest/config').TestProjectConfiguration[]}
 */
const vitestWorkspace = defineWorkspace(['apps/*/vitest.config.mjs', 'libs/*/vitest.config.mjs'])

export default vitestWorkspace
