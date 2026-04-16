const app = require("./app");
const initDB = require("./config/initDb");

// 🌱 Initialize DB (tables + seed data)
initDB();

// 🌍 Use Render PORT or fallback
const PORT = process.env.PORT || 5000;

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});