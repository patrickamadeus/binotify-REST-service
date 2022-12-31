require("dotenv").config()
const expressLoader = require("./expressLoader");

module.exports = async (expressApp) => {
  const app = await expressLoader(expressApp);
  return app;
};
