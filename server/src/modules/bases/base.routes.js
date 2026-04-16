const router = require("express").Router();
const controller = require("./base.controller");

router.get("/", controller.getAll);

module.exports = router;