const Plant = require("../models/plant.model");
const User = require("../models/user.model");
const FCM = require("fcm-node");
const KEY ="AAAAI4VJMU4:APA91bFbyRckKHeTWU5dIPby18DBKj5LZoJ49reCwmStj_JjnuYiJSIV6kp74oC0lVshxbI81Gzi4z3Kj7VNWzUjPHT-EVpUlhWVbW8XdLWjAXF5_U4e0v1BQKPno1OAN2qDMc4GeYWj";
const fcm = new FCM(KEY);

let Controller = {};

Controller.getPlant = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id).populate("owner");
    return res.status(200).json(plant);
  } catch (error) {
    return res.status(400).json("Could not get plant.");
  }
};

Controller.addReading = async (req, res) => {
  try {
    const plant = await Plant.findOne({ deviceID: req.params.id });
    plant.height.push({ plantHeight: req.body.plantHeight });
    plant.sensorReadings.push({
      reading: {
        soil: req.body.soil,
        light: req.body.light,
        pressure: req.body.pressure,
        airspeed: req.body.airspeed,
        temp: req.body.temp,
        pH: req.body.pH
      }
    });
    const status = req.body.status;
    const user = await User.findById(plant.owner)
    const deviceToken = user.deviceToken


    if (status === "needs_light_and_water") {
      plant.status = "Needs Light and Water";
      const messagelv = {
        to: deviceToken,
        notification: {
          title: "Alert",
          body: "Your plant needs more light and water!"
        }
      };
      fcm.send(messagelv, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
    } else if (status === "needs_sunlight") {
      const messages = {
        to: deviceToken,
        notification: {
          title: "Alert",
          body: "Your plant needs more sunlight!"
        }
      };
      try {
        fcm.send(messages);
      } catch (error) {
        return res.status(400).json("Error sending notification");
      }
      plant.status = "Needs More Light";
    } else if (status === "needs_water") {
      const messagew = {
        to: deviceToken,
        notification: {
          title: "Alert",
          body: "Your plant needs more water!"
        }
      };
      try {
        fcm.send(messagew);
      } catch (error) {
        return res.status(400).json("Error sending notification");
      }
      plant.status = "Needs Water";
    } else {
      plant.status = "Healthy";
    }
    plant.save();
    return res.status(200).json(plant);
  } catch (error) {
    return res.status(400).json("Could not add reading");
  }
};

Controller.editPlant = async (req, res) => {
  try {
    const newObj = await Plant.findByIdAndUpdate(
      req.params.id,
      req.body.plant,
      {
        useFindAndModify: false,
        new: true
      }
    );
    return res.status(200).json(newObj);
  } catch (error) {
    return res.status(400).json("Could not edit plant.");
  }
};

Controller.deletePlant = async (req, res) => {
  try {
    await Plant.findByIdAndRemove(req.params.id);
    return res.status(200).json("Deleted");
  } catch (error) {
    return res.status(400).json("Could not delete plant.");
  }
};

module.exports = Controller;