const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Plant = require("../models/plant.model");
const {
  loginValidation,
  registerValidation,
  plantValidation
} = require("../middleware/validation");

let Controller = {};

Controller.signup = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    let user;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    console.log('sigup request body',req.body);
    try {
      user = await User.create({
        name: req.body.name,
        username: req.body.username,
        password: hashed,
        deviceToken: req.body.deviceToken
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json("User already exists.");
    }
  } catch (error) {
    return res.status(400).json("Error occured during signup.");
  }
};

Controller.login = async (req, res) => {
  const { error } = loginValidation(req.body);
  console.log("login request body" , req.body)
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    const user = await User.findOne({ username: req.body.username });
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.status(400).json("Username or Password is incorrect.");
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    user.deviceToken = req.body.deviceToken;
    return res
      .header("auth-token", token)
      .status(200)
      .json({ id: user._id, token: token });
  } catch (error) {
    return res.status(400).json("Could not login.");
  }
};

Controller.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("plants");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json("Could not get User");
  }
};

Controller.addPlant = async (req, res) => {
  try {
    console.log("Add plant requset body",req.body)
    const user = await User.findById(req.params.id);
    const { error } = plantValidation(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }
    try {
      const plant = await Plant.create({
        name: req.body.name,
        nickname: req.body.nickname,
        deviceID: req.body.deviceID,
        commonName: req.body.commonName,
        image: req.body.image,
        description: req.body.description,
        origin: req.body.origin,
        owner: user
      });
      user.plants.push(plant);
      user.save();
      return res.status(200).json(plant);
    } catch (error) {
      return res.status(400).json("Could not add plant" + error);
    }
  } catch (error) {
    return res.status(400).json("Could not find user");
  }
};

Controller.editUser = async (req, res) => {
  try {
    const newObj = await User.findByIdAndUpdate(req.params.id, req.body.user, {
      useFindAndModify: false,
      new: true
    });
    return res.status(200).json(newObj);
  } catch (error) {
    return res.status(400).json("Could not edit user.");
  }
};

Controller.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    return res.status(200).json("Deleted");
  } catch (error) {
    return res.status(400).json("Could not delete user.");
  }
};

module.exports = Controller;
