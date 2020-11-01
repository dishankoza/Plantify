const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  timeToComplete: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Info", infoSchema);
