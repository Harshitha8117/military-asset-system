const service = require("./auth.service");

exports.login = async (req, res) => {
  try {
    const data = await service.login(req.body);
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};