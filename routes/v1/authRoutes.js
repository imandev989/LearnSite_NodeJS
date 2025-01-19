const express = require("express");

const authController = require("../../controllers/v1/authController");


const router = express.Router();


router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/getMe", authController.getMe);


module.exports = router;