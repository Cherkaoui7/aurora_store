import 'dotenv/config';
import mongoose from 'mongoose';
import cloudinary from './config/cloudinary.js';

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ DB Connection Error:", err);
        process.exit(1);
    }
};

const migrate = async () => {
    await connectDB();

    // Check Cloudinary Config
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
        console.error("❌ Missing Cloudinary credentials in .env");
        process.exit(1);
    }

    const Product = mongoose.models.product || mongoose.model('product', new mongoose.Schema({}, { strict: false }));
    const products = await Product.find({});
    console.log(`Found ${products.length} products to check.`);

    let updatedCount = 0;

    for (const product of products) {
        let changed = false;
        const newImages = [];

        if (!product.image || product.image.length === 0) continue;

        console.log(`Checking product: ${product.name}`);

        for (const img of product.image) {
            // Check if it's a Base64 data URL
            if (img.startsWith('data:')) {
                try {
                    console.log(`  uploading base64 image...`);
                    // Upload to Cloudinary
                    const uploadRes = await cloudinary.uploader.upload(img, {
                        folder: "aurora_store_products",
                        resource_type: "image"
                    });

                    newImages.push(uploadRes.secure_url);
                    changed = true;
                    console.log(`  ✅ Uploaded: ${uploadRes.secure_url}`);
                } catch (error) {
                    console.error(`  ❌ Upload failed: ${error.message}`);
                    newImages.push(img); // Keep original if fail
                }
            } else {
                // Already a URL (cloud or local filename that we can't migrate easily if file missing)
                // If it's a legacy local filename but migration to base64 was done, this shouldn't happen often
                // If it's already http (e.g. from previous manual add), keep it.
                newImages.push(img);
            }
        }

        if (changed) {
            await Product.updateOne({ _id: product._id }, { $set: { image: newImages } });
            updatedCount++;
            console.log(`  💾 Updated product in DB`);
        }
    }

    console.log(`\n🎉 Migration Complete. Updated ${updatedCount} products.`);
    process.exit(0);
};

migrate();
