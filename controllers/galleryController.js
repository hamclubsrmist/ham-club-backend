
const Gallery = require("../models/Gallery");

// ========================================
// GET ALL GALLERY PHOTOS
// ========================================

const getGallery = async (req, res) => {
    try {
        const gallery = await Gallery.find()
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: gallery.length,
            gallery
        });
    } catch (error) {
        console.error("Get gallery error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch gallery",
            error: error.message
        });
    }
};


// ========================================
// GET ONE GALLERY PHOTO
// ========================================

const getGalleryById = async (req, res) => {
    try {
        const item = await Gallery.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Gallery photo not found"
            });
        }

        return res.status(200).json({
            success: true,
            item
        });
    } catch (error) {
        console.error("Get gallery photo error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch gallery photo",
            error: error.message
        });
    }
};


// ========================================
// UPLOAD ONE GALLERY PHOTO - CLOUDINARY
// ========================================

const createGallery = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No image received. Use the file field name "image".'
            });
        }

        // CloudinaryStorage supplies the hosted URL in req.file.path.
        const imagePath = req.file.path;

        if (
            typeof imagePath !== "string" ||
            !imagePath.startsWith("https://")
        ) {
            console.error("Cloudinary URL missing from uploaded file:", {
                filename: req.file.filename,
                path: req.file.path
            });

            return res.status(500).json({
                success: false,
                message: "Cloudinary did not return a valid image URL."
            });
        }

        const title =
            typeof req.body.title === "string"
                ? req.body.title.trim()
                : "";

        const description =
            typeof req.body.description === "string"
                ? req.body.description.trim()
                : "";

        const eventName =
            typeof req.body.event === "string"
                ? req.body.event.trim()
                : "";

        if (!title || !eventName) {
            return res.status(400).json({
                success: false,
                message: "Title and event name are required."
            });
        }

        const gallery = await Gallery.create({
            title,
            description,
            event: eventName,
            image: imagePath
        });

        console.log("Gallery photo saved:", {
            id: gallery._id,
            event: gallery.event,
            image: gallery.image
        });

        return res.status(201).json({
            success: true,
            message: "Gallery photo uploaded successfully.",
            gallery
        });
    } catch (error) {
        console.error("Create gallery error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to upload gallery photo.",
            error: error.message
        });
    }
};


// ========================================
// UPDATE GALLERY PHOTO DETAILS
// ========================================

const updateGallery = async (req, res) => {
    try {
        const updates = {};

        if (typeof req.body.title === "string") {
            updates.title = req.body.title.trim();
        }

        if (typeof req.body.description === "string") {
            updates.description = req.body.description.trim();
        }

        if (typeof req.body.event === "string") {
            updates.event = req.body.event.trim();
        }

        const item = await Gallery.findByIdAndUpdate(
            req.params.id,
            updates,
            {
                new: true,
                runValidators: true
            }
        );

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Gallery photo not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Gallery details updated successfully.",
            item
        });
    } catch (error) {
        console.error("Update gallery error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update gallery details.",
            error: error.message
        });
    }
};


// ========================================
// DELETE ONE GALLERY PHOTO
// ========================================

const deleteGallery = async (req, res) => {
    try {
        const item = await Gallery.findByIdAndDelete(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Gallery photo not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Gallery photo deleted successfully."
        });
    } catch (error) {
        console.error("Delete gallery photo error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete gallery photo.",
            error: error.message
        });
    }
};


// ========================================
// EXPORT CONTROLLER FUNCTIONS
// ========================================

module.exports = {
    getGallery,
    getGalleryById,
    createGallery,
    updateGallery,
    deleteGallery
};
