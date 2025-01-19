const express = require("express");
const userController = require("../../controllers/v1/userController");

const authMiddelware = require("../../middelwares/authMiddelware");
const isAdminMiddelware = require("../../middelwares/isAdminMiddelware");

const router = express.Router();



// router.post("/banuser", banController.ban);

router.route('/').get(authMiddelware, isAdminMiddelware, userController.getAll).put(authMiddelware, userController.updateUser);

router.route("/role").put(authMiddelware, isAdminMiddelware, userController.changeRole);



router.route('/:id').delete(authMiddelware, isAdminMiddelware, userController.removeUser);

router.route('/ban/:id').post(authMiddelware, isAdminMiddelware, userController.banUser)

module.exports = router