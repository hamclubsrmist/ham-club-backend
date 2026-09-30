const Gallery = require("../models/Gallery");

// Get all gallery images
const getGallery = async (req, res) => {
    try {
        const gallery = await Gallery.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: gallery.length,
            gallery
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch gallery",
            error: error.message
        });
    }
};


// Get one gallery item
const getGalleryById = async (req, res) => {
    try {
        const item = await Gallery.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Gallery item not found"
            });
        }

        res.status(200).json({
            success: true,
            item
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch gallery item",
            error: error.message
        });
    }
};


// Upload gallery image - Admin only
const createGallery = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image"
            });
        }

        const {
            title,
            description,
            event
        } = req.body;

        const gallery = await Gallery.create({
            title,
            description,
            event,
            image: `/uploads/${req.file.filename}`
        });

        res.status(201).json({
            success: true,
            message: "Gallery image uploaded successfully",
            gallery
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to upload gallery image",
            error: error.message
        });
    }
};


// Update gallery information - Admin only
const updateGallery = async (req, res) => {
    try {
        const item = await Gallery.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Gallery item not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Gallery item updated successfully",
            item
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update gallery item",
            error: error.message
        });
    }
};


// Delete gallery image - Admin only
const deleteGallery = async (req, res) => {
    try {
        const item = await Gallery.findByIdAndDelete(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Gallery item not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Gallery item deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete gallery item",
            error: error.message
        });
    }
};


module.exports = {
    getGallery,
    getGalleryById,
    createGallery,
    updateGallery,
    deleteGallery
};