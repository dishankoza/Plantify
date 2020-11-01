const Info = require("../models/info.model");

let Controller = {};

Controller.getInfo = async (req, res) => {
  try {
    const infos = await Info.find({});
    return res.status(200).json(infos);
  } catch (error) {
    return res.status(400).json("Could not get info.");
  }
};

module.exports = Controller;
