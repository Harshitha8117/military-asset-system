const service = require("./user.service");

exports.getAll = async (req, res) => {
  const users = await service.getUsers();
  res.json(users);
};