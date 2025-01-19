const express = require("express");
const ordersController = require("./../../controllers/v1/orderController");
const authMiddleware = require("./../../middelwares/authMiddelware");

const router = express.Router();

router.route("/").get(authMiddleware, ordersController.getAll);
router.route("/:id").get(authMiddleware, ordersController.getOne);

module.exports = router;
