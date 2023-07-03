import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

/** @type {import('ts-jest').JestConfigWithTsJest} */
const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
  moduleDirectories: ['node_modules'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/e2e/'
  ],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/$1',
    '@smartive-education/thierry-simon-mumble':
      '<rootDir>/node_modules/@smartive-education/thierry-simon-mumble/dist/index.js'
  }
}

const config = async () => ({
  ...(await createJestConfig(customJestConfig)()),
  transformIgnorePatterns: [
    'node_modules/(?!(@smartive-education/thierry-simon-mumble)/)',
    '^.+\\.module\\.(css|sass|scss)$'
  ]
})

export default config
