const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    getGallery,
    getGalleryById,
    createGallery,
    updateGallery,
    deleteGallery
} = require("../controllers/galleryController");


// ===============================
// PUBLIC ROUTES
// ===============================

// Anyone can view gallery
router.get("/", getGallery);

// Anyone can view one gallery item
router.get("/:id", getGalleryById);


// ===============================
// ADMIN ONLY ROUTES
// ===============================

// Admin can upload gallery image
router.post(
    "/",
    protect,
    upload.single("image"),
    createGallery
);

// Admin can update gallery information
router.put(
    "/:id",
    protect,
    updateGallery
);

// Admin can delete gallery item
router.delete(
    "/:id",
    protect,
    deleteGallery
);


module.exports = router;