
const Gallery = require("../models/Gallery");
const path = require("path");

// ========================================
// GET ALL GALLERY PHOTOS
// ========================================

const getGallery = async (req, res) => {
    try {
        const gallery = await Gallery.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: gallery.length,
            gallery
        });

    } catch (error) {
        console.error("Get gallery error:", error);

        res.status(500).json({
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

        res.status(200).json({
            success: true,
            item
        });

    } catch (error) {
        console.error("Get gallery photo error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch gallery photo",
            error: error.message
        });
    }
};


// ========================================
// UPLOAD ONE GALLERY PHOTO
// ========================================

const createGallery = async (req, res) => {
    try {

        // Check whether Multer received a file
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message:
                    'No image received. Use the file field name "image".'
            });
        }

        // Verify the uploaded filename
        if (!req.file.filename) {
            console.error("Uploaded file details:", req.file);

            return res.status(400).json({
                success: false,
                message:
                    "The uploaded image has no filename. Check uploadMiddleware.js."
            });
        }

        // Read form fields
        const title = (req.body.title || "").trim();
        const description = (req.body.description || "").trim();
        const eventName = (req.body.event || "").trim();

        // Validate required fields
        if (!title || !eventName) {
            return res.status(400).json({
                success: false,
                message: "Title and event name are required."
            });
        }

        // Build the saved image path
        const filename = path.basename(req.file.filename);
        const imagePath = `/uploads/${filename}`;

        // Save the photo details in MongoDB
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

        // Send the saved record to the frontend
        res.status(201).json({
            success: true,
            message: "Gallery photo uploaded successfully.",
            gallery
        });

    } catch (error) {
        console.error("Create gallery error:", error);

        res.status(500).json({
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
        const item = await Gallery.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                description: req.body.description,
                event: req.body.event
            },
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

        res.status(200).json({
            success: true,
            message: "Gallery details updated successfully.",
            item
        });

    } catch (error) {
        console.error("Update gallery error:", error);

        res.status(500).json({
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
        const item = await Gallery.findByIdAndDelete(
            req.params.id
        );

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Gallery photo not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Gallery photo deleted successfully."
        });

    } catch (error) {
        console.error("Delete gallery error:", error);

        res.status(500).json({
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
