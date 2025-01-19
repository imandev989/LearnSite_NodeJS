const express = require("express");
const multer = require("multer");
const router = express.Router();
const multerStorage = require("../../utils/uploader");
const authMiddleware = require("../../middelwares/authMiddelware");
const isAdminMiddleware = require("../../middelwares/isAdminMiddelware")
const courseController = require("../../controllers/v1/courseController")

router.route('/').post(multer({ storage: multerStorage, limits: { fileSize: 1000000000 } }).single("cover"), authMiddleware, isAdminMiddleware, courseController.create)

router.route("/:href").get(authMiddleware, courseController.getOne);
router.route("/:id").delete(authMiddleware, isAdminMiddleware, courseController.remove);
router.route("/related/:href").get(courseController.getRelated)
router.route("/popular").get(courseController.popular);
router.route("/presell").get(courseController.presell);
router.route("/:id/sessions").post(
    // multer({ storage: multerStorage, limits: { fileSize: 1000000000 } }).single("video"),
    authMiddleware, isAdminMiddleware, courseController.createSession)
router.route('/sessions').get(authMiddleware, isAdminMiddleware, courseController.getAllSessions);
router.route("/category/:href").get(courseController.getCourseByCategory);
router.route("/:id/register").post(authMiddleware, courseController.register)
router.route("/:href/:sessionID").get(courseController.getSessionInfo);
router.route("/sessions/:id").delete(authMiddleware, isAdminMiddleware, courseController.removeSession)
module.exports = router;