const express = require("express");
const offController = require("../../controllers/v1/offController");
const authMiddelware = require("../../middelwares/authMiddelware");
const isAdminMiddelware = require("../../middelwares/isAdminMiddelware");

const router = express.Router();

router.route('/').get(authMiddelware, isAdminMiddelware, offController.getAll).post(authMiddelware, isAdminMiddelware, offController.create);


router.route('/all').post(authMiddelware, isAdminMiddelware, offController.setOnAll)

router.route("/:code").post(authMiddelware, offController.getOne);

router.route("/:id").delete(authMiddelware, offController.remove)


module.exports = router;