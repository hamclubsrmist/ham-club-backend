const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    getTeam,
    getTeamMemberById,
    getMemberByMemberId,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember
} = require("../controllers/teamController");


// =====================================
// PUBLIC ROUTES
// =====================================

// Get all members
router.get("/", getTeam);

// Get member using HAM Member ID
// Example:
// /api/team/member/HAM26-001
router.get("/member/:memberId", getMemberByMemberId);

// Get member using MongoDB _id
router.get("/:id", getTeamMemberById);


// =====================================
// ADMIN PROTECTED ROUTES
// =====================================

// Add member
router.post(
    "/",
    protect,
    upload.single("image"),
    createTeamMember
);

// Update member
router.put(
    "/:id",
    protect,
    upload.single("image"),
    updateTeamMember
);

// Delete member
router.delete(
    "/:id",
    protect,
    deleteTeamMember
);


module.exports = router;