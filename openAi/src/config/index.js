const dotenv = require("dotenv");

// Trim the NODE_ENV value to remove any trailing spaces
const nodeEnv = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : "dev";

console.log("NODE_ENV:", `"${nodeEnv}"`);

if (nodeEnv !== "prod") {
  const configFile = `./.env.${nodeEnv}`;
  const result = dotenv.config({ path: configFile });
  console.log(`Loaded environment variables from ${configFile}`);
} else {
  console.log("Attempting to load environment variables from .env");
  const result = dotenv.config();
}

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
  OPENAI_SECRET: process.env.OPENAI_KEY,
  GROQ_SECRET: process.env.GROG_KEY
};
