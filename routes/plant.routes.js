const Router = require("express").Router();
const Controller = require("../controllers/plant.controller");
const { isLoggedIn } = require("../middleware/security");

Router.get("/:id", async (req, res) => {
  await Controller.getPlant(req, res);
});

Router.put("/:id/add", async (req, res) => {
  await Controller.addReading(req, res);
});

Router.put("/:id/edit", async (req, res) => {
  await Controller.editPlant(req, res);
});

Router.delete("/:id/delete", async (req, res) => {
  await Controller.deletePlant(req, res);
});

module.exports = Router;
