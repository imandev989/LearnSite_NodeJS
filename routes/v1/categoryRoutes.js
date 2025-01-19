const express = require("express");
const authMiddelware = require("../../middelwares/authMiddelware");
const isAdminMiddelware = require("../../middelwares/isAdminMiddelware");
const categoryController = require("../../controllers/v1/categoryController")

const router = express.Router();

router.route("/").post(authMiddelware, isAdminMiddelware, categoryController.create).get(categoryController.getAll)
router.route("/:id").delete(authMiddelware, isAdminMiddelware, categoryController.remove).put(authMiddelware, isAdminMiddelware, categoryController.update)


module.exports = router;

