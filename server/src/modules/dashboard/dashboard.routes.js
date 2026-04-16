const router = require("express").Router();
const controller = require("./dashboard.controller");
const auth = require("../../middleware/auth.middleware");

router.get("/", controller.get);

module.exports = router;