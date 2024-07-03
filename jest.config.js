module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!react-native-linear-gradient|@react-native|react-native)',
  ],
  setupFiles: ['<rootDir>/jest.setup.js'],
  // moduleNameMapper: {
  //   "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/mocks/fileMock.js",
  //   "\\.(css|less)$": "<rootDir>/mocks/fileMock.js"
  // }
};
