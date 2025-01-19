const express = require("express");
const authMiddelware = require("../../middelwares/authMiddelware");
const commentController = require("../../controllers/v1/commentController");
const isAdminMiddelware = require("../../middelwares/isAdminMiddelware");




const router = express.Router();

router.route('/').post(authMiddelware, commentController.create).get(authMiddelware, isAdminMiddelware, commentController.getAll);
router.route('/:id').delete(authMiddelware, isAdminMiddelware, commentController.remove);
router.route('/:id/accept').put(authMiddelware, isAdminMiddelware, commentController.accept);
router.route('/:id/reject').put(authMiddelware, isAdminMiddelware, commentController.reject);
router.route('/:id/answer').put(authMiddelware, isAdminMiddelware, commentController.answer)
module.exports = router