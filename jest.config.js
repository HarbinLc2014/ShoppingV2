module.exports = {
    preset: 'react-native',
    transform: {
      '^.+\\.(ts|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
      'node_modules/(?!(react-native|@react-native|@testing-library)/)',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    "jest": {
  "setupFilesAfterEnv": ["<rootDir>/jest-setup.js"]
}
  };