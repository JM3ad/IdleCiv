module.exports = {
    moduleFileExtensions: ["ts", "tsx", "js", "json"],
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
    globals: {
      "ts-jest": {
        tsConfig: "tsconfig.json"
      }
    },
    modulePaths: ["<rootDir>/src/"],
    testMatch: ["**/__tests__/**/*.+(ts|tsx|js)"],
    testPathIgnorePatterns: ["/node_modules/", "/dist/", "/lib/"],
    verbose: true,
    testURL: "http://localhost/"
  };