
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ========================================
// UPLOADS DIRECTORY
// ========================================

const uploadDirectory = path.join(
    __dirname,
    "..",
    "uploads"
);

// Create the directory if it does not exist
fs.mkdirSync(uploadDirectory, {
    recursive: true
});


// ========================================
// FILE STORAGE SETTINGS
// ========================================

const storage = multer.diskStorage({

    destination: (req, file, callback) => {
        callback(null, uploadDirectory);
    },

    filename: (req, file, callback) => {

        const extension = path.extname(
            file.originalname
        ).toLowerCase();

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            extension;

        callback(null, uniqueName);
    }
});


// ========================================
// ALLOW IMAGE FILES ONLY
// ========================================

const fileFilter = (req, file, callback) => {

    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(
            new Error("Only JPG, PNG and WebP images are allowed.")
        );
    }
};


// ========================================
// MULTER CONFIGURATION
// ========================================

const upload = multer({

    storage: storage,

    fileFilter: fileFilter,

    limits: {
        fileSize: 5 * 1024 * 1024
    }

});

module.exports = upload;
