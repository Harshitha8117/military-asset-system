const service = require("./dashboard.service");

exports.get = async (req, res) => {
  const data = await service.getMetrics(req.query);
  res.json(data);
};