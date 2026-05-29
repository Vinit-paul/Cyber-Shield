const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
    scanHeaders,
    getAllScans,
    getSingleScan,
    deleteScan
} = require("../controllers/scanController");

router.post("/headers", authMiddleware, scanHeaders);
router.get("/", authMiddleware, getAllScans);
router.get("/:id", authMiddleware, getSingleScan);
router.delete("/:id", authMiddleware, deleteScan);

module.exports = router;