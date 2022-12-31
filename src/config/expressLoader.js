const cors = require("cors");
const express = require("express");

module.exports = async (app) => {
  app.use(cors());
  app.use(express.json());

  return app;
};
