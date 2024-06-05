const dotenv = require("dotenv").config({ path: ".env.development" });
const nextJS = require("next/jest");

const createJestConfig = nextJS({
  dir: ".",
});
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
});

module.exports = jestConfig;
