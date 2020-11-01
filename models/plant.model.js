const mongoose = require("mongoose");

const sensorReadingSchema = new mongoose.Schema({
  soil: {
    type: Number
  },
  light: {
    type: Number
  },
  pressure: {
    type: Number
  },
  airspeed: {
    type: Number
  },
  temp: {
    type: Number
  },
  pH: {
    type: Number
  }
});

const plantSchema = new mongoose.Schema({
  deviceID: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  height: [
    {
      plantHeight: {
        type: Number,
        required: true
      },
      as_of: {
        type: Date,
        default: Date.now
      }
    }
  ],
  image: {
    type: String,
    required: true
  },
  origin: {
    type: String
  },
  commonName: {
    type: String
  },
  description: {
    type: String
  },
  status: {
    type: String,
    default: "NA"
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  sensorReadings: [
    {
      reading: sensorReadingSchema,
      taken_on: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model("Plant", plantSchema);
