require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const contactRoutes = require("./src/routes/contactRoutes");
const galleryRoutes = require("./src/routes/galleryRoutes");
const adminRoutes = require("./src/routes/adminRoutes")

const app = express();

app.use(cors());
app.use(express.json());

// FIXED
app.use("/api/gallery", galleryRoutes);
app.use("/api/enquiry", contactRoutes);
app.use("/api/admin",adminRoutes)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected successfully ✅"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} successfully 💯`);
});