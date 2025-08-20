// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const router = require("./routes/projectRoutes"); // Your routes

const app = express();

// ====== Middleware ======
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ====== MongoDB Connection ======
mongoose
  .connect("mongodb://127.0.0.1:27017/srptracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ====== Routes ======
app.use("/api/projects", router);

// ====== Start Server ======
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

