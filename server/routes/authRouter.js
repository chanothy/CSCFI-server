const express = require("express");
const router = express.Router();
require("../db.js");
const loginPostController = require("../controllers/auth.js").login;
const registrationPostController = require("../controllers/auth.js").registration;

router.post("/register", registrationPostController);
router.post("/login", loginPostController);

module.exports = {
  authRouter: router
};