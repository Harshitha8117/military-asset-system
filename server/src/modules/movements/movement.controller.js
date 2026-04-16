const service = require("./movement.service");
const audit = require("../audit/audit.service");

// ✅ CREATE
exports.create = async (req, res) => {
  try {
    const movement = await service.createMovement(req.body, req.user);

    await audit.log({
      user_id: req.user ? req.user.id : null,
      action: "CREATE_MOVEMENT",
      payload: req.body,
    });

    res.json(movement);
  } catch (err) {
    console.error("❌ CREATE ERROR:", err);
    res.status(500).json({ error: "Failed to create movement" });
  }
};

// ✅ GET ALL
exports.getAll = async (req, res) => {
  try {
    const data = await service.getMovements();

    console.log("📦 Movements fetched:", data); // 🔥 DEBUG

    res.json(data || []); // 🔥 ALWAYS ARRAY
  } catch (err) {
    console.error("❌ FETCH ERROR:", err);
    res.status(500).json({ error: "Failed to fetch movements" });
  }
};