const Contact = require("../models/Contact");

// =====================================
// CREATE CONTACT MESSAGE - PUBLIC
// =====================================

const createContact = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            subject,
            message
        } = req.body;

        const contact = await Contact.create({
            name,
            email,
            phone,
            subject,
            message
        });

        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            contact
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to send message",
            error: error.message
        });
    }
};


// =====================================
// GET ALL CONTACT MESSAGES - ADMIN
// =====================================

const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({
            createdAt: -1
        });

        res.status(200).json({
            success: true,
            count: contacts.length,
            contacts
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch messages",
            error: error.message
        });
    }
};


// =====================================
// GET SINGLE CONTACT - ADMIN
// =====================================

const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Message not found"
            });
        }

        res.status(200).json({
            success: true,
            contact
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch message",
            error: error.message
        });
    }
};


// =====================================
// UPDATE CONTACT STATUS - ADMIN
// =====================================

const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Message not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Message updated successfully",
            contact
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update message",
            error: error.message
        });
    }
};


// =====================================
// DELETE CONTACT - ADMIN
// =====================================

const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(
            req.params.id
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Message not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Message deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete message",
            error: error.message
        });
    }
};


module.exports = {
    createContact,
    getContacts,
    getContactById,
    updateContact,
    deleteContact
};