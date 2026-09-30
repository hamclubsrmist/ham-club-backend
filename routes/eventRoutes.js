const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
} = require("../controllers/eventController");

// ===============================
// PUBLIC ROUTES
// ===============================

// Anyone can view all events
router.get("/", getEvents);

// Anyone can view one event
router.get("/:id", getEventById);


// ===============================
// ADMIN ONLY ROUTES
// ===============================

// Admin can create an event
router.post("/", protect, createEvent);

// Admin can update an event
router.put("/:id", protect, updateEvent);

// Admin can delete an event
router.delete("/:id", protect, deleteEvent);


module.exports = router;