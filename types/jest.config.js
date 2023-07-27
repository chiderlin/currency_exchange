module.exports = {
    clearMocks: true,
    coverageProvider: 'v8',
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
    roots: ['<rootDir>/src/test'],
    testMatch: ['**/test/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
};
