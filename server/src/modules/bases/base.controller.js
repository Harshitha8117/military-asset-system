const service = require("./base.service");

exports.getAll = async (req, res) => {
  res.json(await service.getBases());
};