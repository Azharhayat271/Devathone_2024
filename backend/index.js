const express = require("express");
const connectDB = require("./config/connection");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());

// Enable CORS for all origins
app.use(cors());

//connet to mongoDB
connectDB();

const userRoutes = require("./routes/user");
const appointmentRoutes = require("./routes/appointment");
const medicalRecordRoutes = require("./routes/medicalRecord");

// All routes
app.use("/api/users", userRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/medicalrecords", medicalRecordRoutes);

app.get("/", (req, res) => {
  res.send("We are live");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App listening at ${port}`);
});
