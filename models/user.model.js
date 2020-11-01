const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  deviceToken: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  plants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plant"
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
