const express = require("express");
const notificationController = require("../../controllers/v1/notificationController");

const authMiddleware = require("../../middelwares/authMiddelware");


const isAdminMiddelware = require("../../middelwares/isAdminMiddelware");

const router = express.Router();



router.route("/").post(authMiddleware, isAdminMiddelware, notificationController.create).get(authMiddleware, isAdminMiddelware, notificationController.getAll);
router.route("/admins").get(authMiddleware, isAdminMiddelware, notificationController.get);
router.route("/:id/see").put(authMiddleware, isAdminMiddelware, notificationController.seen);
module.exports = router;