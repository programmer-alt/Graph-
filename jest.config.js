module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@babel/core|@babel/preset-env|@babel/preset-react|@babel/preset-typescript)"
  ],
  verbose: true,
};