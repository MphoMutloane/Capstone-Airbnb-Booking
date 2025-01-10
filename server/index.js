const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Import Routes
const authRoutes = require("./routes/auth.js");
const listingRoutes = require("./routes/listing.js");
const reservationRoutes = require("./routes/reservation.js");

// API Routes
app.use("/auth", authRoutes); // Authentication routes
app.use("/api/listings", listingRoutes); // Listing-related routes
app.use("/api/reservations", reservationRoutes); // Reservation-related routes

// Serve Frontend in Production
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "../client/build");
  app.use(express.static(buildPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

// MongoDB Setup
const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "Airbnb-Booking",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((err) =>
    console.error(`Database connection error: ${err.message}`)
  );



