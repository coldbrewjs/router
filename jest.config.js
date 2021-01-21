module.exports = {
    roots: ['<rootDir>'],
    verbose: true,
    moduleFileExtensions: ['js', 'json', 'ts', 'json'],
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
    testMatch: ['<rootDir>/src/**/*.test.ts', '<rootDir>/tests/**/*.test.ts'],
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
