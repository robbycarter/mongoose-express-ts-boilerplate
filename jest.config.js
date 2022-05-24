require('dotenv').config({
    path:"test.env"
})

module.exports = {
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json'
        }
    },
    moduleFileExtensions: [
        'ts',
        'js'
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    testMatch: [
        '**/tests/**/*.test.(ts)'
    ],
    testEnvironment: 'node',
    preset: 'ts-jest'
};