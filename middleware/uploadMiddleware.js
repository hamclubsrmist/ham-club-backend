const multer = require("multer");
const path = require("path");

// Where uploaded images will be stored
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1E9);

        cb(
            null,
            uniqueName + path.extname(file.originalname)
        );
    }
});

// Allow only image files
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;

    const extension =
        allowedTypes.test(
            path.extname(file.originalname).toLowerCase()
        );

    const mimeType =
        allowedTypes.test(file.mimetype);

    if (extension && mimeType) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"));
    }
};

// Create Multer upload middleware
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

module.exports = upload;