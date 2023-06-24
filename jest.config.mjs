import nextJest from 'next/jest.js'

/** @type {import('ts-jest').JestConfigWithTsJest} */
const customJestConfig = {
  verbose: true,
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/e2e/'
  ]
}

const createJestConfig = nextJest({ dir: './' })

const config = async () => ({
  ...(await createJestConfig(customJestConfig)())
})

export default config
