const router = require("express").Router();
const controller = require("./equipment.controller");

router.get("/", controller.getAll);

module.exports = router;