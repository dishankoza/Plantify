const Router = require("express").Router();
const Controller = require("../controllers/user.controller");
const { isLoggedIn } = require("../middleware/security");

Router.post("/login", async (req, res) => {
  await Controller.login(req, res);
});

Router.post("/signup", async (req, res) => {
  await Controller.signup(req, res);
});

Router.get("/:id", async (req, res) => {
  await Controller.getUser(req, res);
});

Router.put("/:id/plant/add", async (req, res) => {
  await Controller.addPlant(req, res);
});

Router.put("/:id/edit", async (req, res) => {
  await Controller.editUser(req, res);
});

Router.delete("/:id/delete", async (req, res) => {
  await Controller.deleteUser(req, res);
});

module.exports = Router;
