// src/app.js

const express = require("express");
const cors = require("cors");
const movementRoutes = require("./modules/movements/movement.routes");
const dashboardRoutes = require("./modules/dashboard/dashboard.routes");


const app = express();

app.use(cors());
app.use(express.json());

// 🔗 Routes
app.use("/api/auth", require("./modules/auth/auth.routes"));
app.use("/api/users", require("./modules/users/user.routes"));
app.use("/api/bases", require("./modules/bases/base.routes"));
app.use("/api/equipment", require("./modules/equipment/equipment.routes"));
app.use("/api/movements", require("./modules/movements/movement.routes"));
app.use("/api/dashboard", require("./modules/dashboard/dashboard.routes"));

// ✅ Health check (very useful)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

module.exports = app;