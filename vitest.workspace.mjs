import { defineWorkspace } from 'vitest/config'

const vitestWorkspace = defineWorkspace(['apps/*/vitest.config.mjs', 'libs/*/vitest.config.mjs'])

export default vitestWorkspace
