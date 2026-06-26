// src/routes/adminRoutes.js

const express = require("express");
const router = express.Router();

const { verifySecret } = require("../controllers/adminController");

router.post("/verify-secret", verifySecret);

module.exports = router;