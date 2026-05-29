const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    generateReport
} = require("../controllers/reportController");

router.get(
    "/:id",
    authMiddleware,
    generateReport
);

module.exports = router;