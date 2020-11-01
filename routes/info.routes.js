const Router = require("express").Router();
const Controller = require("../controllers/info.controller");

Router.get("/all", async (req, res) => {
  await Controller.getInfo(req, res);
});

module.exports = Router;
