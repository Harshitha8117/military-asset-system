const service = require("./movement.service");
const audit = require("../audit/audit.service");

exports.create = async (req, res) => {
  const movement = await service.createMovement(req.body, req.user);
  const userId = req.user?.id || null;
  
  await audit.log({
  user_id: req.user ? req.user.id : null,
  action: "CREATE_MOVEMENT",
  payload: req.body
});

  res.json(movement);
};

exports.getAll = async (req, res) => {
  res.json(await service.getMovements());
};