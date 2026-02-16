import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import 'dotenv/config';

// Defaults to Memory Storage (Base64)
let storage = multer.memoryStorage();

// If Cloudinary credentials exist, switch to Cloud Cloud Storage
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'aurora_store_products',
            allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        },
    });
    console.log("☁️  Using Cloudinary Storage for image uploads");
} else {
    console.log("⚠️  Using Memory Storage (Base64) - Cloudinary keys missing");
}

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