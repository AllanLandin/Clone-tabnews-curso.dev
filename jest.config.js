const dotenv = require("dotenv").config({ path: ".env.development" });
const nextJS = require("next/jest");

const createJestConfig = nextJS({
  dir: ".",
});
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
});

module.exports = jestConfig;
