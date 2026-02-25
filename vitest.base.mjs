import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * @type {import('vitest/config')}
 */
const vitestConfig = {
  plugins: [nxViteTsPaths(), react()],
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['html', 'json', 'text'],
    },
    environment: 'jsdom',
    exclude: [
      '**/.cache/**',
      '**/.next/**',
      '**/.nx/**',
      '**/coverage/**',
      '**/dist/**',
      '**/node_modules/**',
    ],
    globals: true,
    reporters: ['default'],
    setupFiles: [resolve(__dirname, 'vitest.setup.mjs')],
    api: {
      host: '127.0.0.1',
      port: 3001,
    },
  },
}

export default defineConfig(vitestConfig)
