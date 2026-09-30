const express = require("express");

const router = express.Router();

const { login } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

// Admin Login
router.post("/login", login);

// Protected Admin Test
router.get("/admin-test", protect, (req, res) => {
    res.json({
        success: true,
        message: "Welcome Admin! You have access to the protected route.",
        admin: req.user
    });
});

module.exports = router;