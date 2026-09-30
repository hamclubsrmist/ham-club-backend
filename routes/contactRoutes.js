const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createContact,
    getContacts,
    getContactById,
    updateContact,
    deleteContact
} = require("../controllers/contactController");

// PUBLIC
router.post("/", createContact);

// ADMIN ONLY
router.get("/", protect, getContacts);

router.get("/:id", protect, getContactById);

router.put("/:id", protect, updateContact);

router.delete("/:id", protect, deleteContact);

module.exports = router;