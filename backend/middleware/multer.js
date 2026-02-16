import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads/')
    },
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`)
    }
})

// Only allow image files
const fileFilter = (req, file, callback) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(new Error('Only image files (jpeg, png, gif, webp) are allowed.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
})

export default upload;