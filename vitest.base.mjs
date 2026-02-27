import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

const vitestConfig = defineConfig({
  plugins: [nxViteTsPaths(), react()],
  test: {
    coverage: {
      exclude: ['**/*.d.ts', '**/*.spec.{ts,tsx}', '**/*.test.{ts,tsx}'],
      include: ['apps/**/*.{ts,tsx}', 'libs/**/*.{ts,tsx}'],
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
    setupFiles: ['./vitest.setup.mjs'],
  },
})

export default vitestConfig
