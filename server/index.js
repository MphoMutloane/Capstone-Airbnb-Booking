const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path"); 

// Import Routes
const authRoutes = require("./routes/auth.js");
const listingRoutes = require("./routes/listing.js");
const reservationRoutes = require("./routes/reservation.js");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/auth", authRoutes); 
app.use("/api/listings", listingRoutes); 
app.use("/api/reservations", reservationRoutes); 

// Serve Frontend in Production
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "../client/build"); // Adjust path if needed
  app.use(express.static(buildPath));

  // Serve index.html for all non-API routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

// Mongoose Setup
const PORT = process.env.PORT || 3001;

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

