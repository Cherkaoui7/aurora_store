// Migration script: Convert local image files to Base64 data URLs in MongoDB
import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
await mongoose.connect(process.env.MONGODB_URI);
console.log('✅ Connected to MongoDB');

// Get the product collection
const Product = mongoose.models.product || mongoose.model('product', new mongoose.Schema({}, { strict: false }));

const products = await Product.find({});
console.log(`Found ${products.length} products`);

let updated = 0;
for (const product of products) {
    if (!product.image || product.image.length === 0) continue;

    const newImages = [];
    let changed = false;

    for (const img of product.image) {
        // Skip if already a data URL or HTTP URL
        if (img.startsWith('data:') || img.startsWith('http')) {
            newImages.push(img);
            continue;
        }

        // It's a filename — try to read from uploads/
        const filePath = path.join(__dirname, 'uploads', img);
        if (fs.existsSync(filePath)) {
            const buffer = fs.readFileSync(filePath);
            // Detect mime type from extension
            const ext = path.extname(img).toLowerCase();
            const mimeMap = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.gif': 'image/gif', '.webp': 'image/webp', '.avif': 'image/avif' };
            const mime = mimeMap[ext] || 'image/png';
            const dataUrl = `data:${mime};base64,${buffer.toString('base64')}`;
            newImages.push(dataUrl);
            changed = true;
            console.log(`  ✅ Converted: ${img} (${(buffer.length / 1024).toFixed(1)}KB)`);
        } else {
            console.log(`  ⚠️ File not found: ${filePath}`);
            newImages.push(img); // Keep original
        }
    }

    if (changed) {
        await Product.updateOne({ _id: product._id }, { $set: { image: newImages } });
        updated++;
        console.log(`  Updated product: ${product.name}`);
    }
}

console.log(`\n🎉 Done! Updated ${updated}/${products.length} products`);
await mongoose.disconnect();
process.exit(0);
