const service = require("./equipment.service");

exports.getAll = async (req, res) => {
  res.json(await service.getEquipment());
};