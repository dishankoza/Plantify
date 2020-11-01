const express = require("express");
const cors = require("cors");
const compression = require("compression");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Import Routes
const userRoutes = require("./routes/user.routes");
const plantRoutes = require("./routes/plant.routes");
const infoRoutes = require("./routes/info.routes");

const app = express();

// ADMIN
const admin = require("./admin/admin.main");
app.use("/admin", admin);

// Middleware
app.use(express.json());
app.use(cors());
app.use(compression());
dotenv.config();

// Database
mongoose.connect(
  process.env.MONGODB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if (err) {
      console.log(err);
    }
    console.log("Connected to DB");
  }
);

// Route Middleware
app.use("/api/user", userRoutes);
app.use("/api/plants", plantRoutes);
app.use("/api/info", infoRoutes);

app.listen(process.env.PORT, () => {
  console.log("Plantify Server Started On " + process.env.PORT);
});
