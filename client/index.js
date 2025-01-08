const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

// Import Routes
const authRoutes = require("./routes/auth.js");
const listingRoutes = require("./routes/listing.js");
const reservationRoutes = require("./routes/reservation.js");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/auth", authRoutes); // Auth-related routes
app.use("/api/listings", listingRoutes); // Listing-related routes
app.use("/api/reservations", reservationRoutes); // Reservation-related routes

// Mongoose Setup
const PORT = 3001;

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "Airbnb-Booking",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((err) => console.log(`Database connection error: ${err}`));

