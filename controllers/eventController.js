const Event = require("../models/Event");

// Get all events
const getEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: events.length,
            events
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch events",
            error: error.message
        });
    }
};


// Get single event
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        res.status(200).json({
            success: true,
            event
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch event",
            error: error.message
        });
    }
};


// Create event - Admin only
const createEvent = async (req, res) => {
    try {
        const {
            title,
            description,
            date,
            location,
            image,
            category
        } = req.body;

        const event = await Event.create({
            title,
            description,
            date,
            location,
            image,
            category
        });

        res.status(201).json({
            success: true,
            message: "Event created successfully",
            event
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create event",
            error: error.message
        });
    }
};


// Update event - Admin only
const updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Event updated successfully",
            event
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update event",
            error: error.message
        });
    }
};


// Delete event - Admin only
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Event deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete event",
            error: error.message
        });
    }
};


module.exports = {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
};