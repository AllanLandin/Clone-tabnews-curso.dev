const dotenv = require("dotenv");
const nextJS = require("next/jest");

dotenv.config({ path: ".env.development" });

const createJestConfig = nextJS({
  dir: ".",
});
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
});

module.exports = jestConfig;
