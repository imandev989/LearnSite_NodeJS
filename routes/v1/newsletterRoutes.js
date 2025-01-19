const express = require("express");
const newsletterController = require("../../controllers/v1/newsletterController");

const authMiddelware = require("../../middelwares/authMiddelware");
const isAdminMiddelware = require("../../middelwares/isAdminMiddelware");


const router = express.Router();


router.route("/").get(authMiddelware, isAdminMiddelware, newsletterController.getAll).post(newsletterController.create)

module.exports = router