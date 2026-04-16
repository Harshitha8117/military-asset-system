const router = require("express").Router();
const controller = require("./movement.controller");
const auth = require("../../middleware/auth.middleware");

router.post("/", controller.create);
router.get("/", controller.getAll);

module.exports = router;