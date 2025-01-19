const express = require("express");

const contactController = require("../../controllers/v1/contactContorller");
const authMiddleware = require("../../middelwares/authMiddelware");
const isAdminMiddleware = require("../../middelwares/isAdminMiddelware");

const router = express.Router();

router.route('/').get(authMiddleware, isAdminMiddleware, contactController.getAll).post(contactController.create)
router.route("/:id").delete(authMiddleware, isAdminMiddleware, contactController.remove);
router.route("/answer").post(authMiddleware, isAdminMiddleware, contactController.answer);

module.exports = router;
