const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
} = require("../controllers/projectController");


// ===============================
// PUBLIC ROUTES
// ===============================
console.log("getProjects:", typeof getProjects);
console.log("getProjectById:", typeof getProjectById);
console.log("createProject:", typeof createProject);

router.get("/", getProjects);

router.get("/:id", getProjectById);


// ===============================
// ADMIN ONLY ROUTES
// ===============================

router.post("/", protect, createProject);

router.put("/:id", protect, updateProject);

router.delete("/:id", protect, deleteProject);


module.exports = router;