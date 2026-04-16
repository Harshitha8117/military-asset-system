const service = require("./movement.service");
const audit = require("../audit/audit.service");

exports.create = async (req, res) => {
  try {
    const movement = await service.createMovement(req.body, req.user);

    await audit.log({
      user_id: req.user ? req.user.id : null,
      action: "CREATE_MOVEMENT",
      payload: req.body
    });

    res.json(movement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create movement" });
  }
};