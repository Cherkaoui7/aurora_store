import mongoose from "mongoose";
import productModel from "../models/productModel.js";

/**
 * Helper to safely escape regular expression special characters.
 * Prevents Regular Expression Denial of Service (ReDoS) by ensuring
 * user-supplied characters like .*+?^${}()|[]\ are treated as literal text.
 */
const escapeRegex = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// Add Product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        if (!name || !price || !category) {
            return res.status(400).json({ success: false, message: "Missing required product fields (name, price, category)." });
        }

        // Enforce at least one product image
        if (!req.files || !req.files.image1 || !req.files.image1[0]) {
            return res.status(400).json({ success: false, message: "Please upload at least one product image." });
        }

        // Helper to get image URL from file object
        const getImageUrl = (file) => {
            if (file.path) return file.path; // Cloudinary or Disk Storage
            if (file.buffer) { // Memory Storage (Base64 fallback)
                const base64 = file.buffer.toString('base64');
                return `data:${file.mimetype};base64,${base64}`;
            }
            return null;
        };

        let imageUrls = [];
        const url = getImageUrl(req.files.image1[0]);
        if (url) {
            imageUrls.push(url);
        } else {
            return res.status(400).json({ success: false, message: "Failed to process uploaded image." });
        }

        let parsedSizes = [];
        try {
            parsedSizes = typeof sizes === 'string' ? JSON.parse(sizes) : (sizes || []);
        } catch {
            parsedSizes = [];
        }

        const productData = {
            name: name.trim(),
            description: (description || '').trim(),
            price: Number(price),
            category,
            subCategory: subCategory || 'General',
            sizes: parsedSizes,
            bestseller: bestseller === true || bestseller === "true",
            image: imageUrls,
            date: Date.now()
        };

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product Added" });

    } catch (error) {
        console.error("Add Product Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// List Products (With projection to prevent excessive data exposure)
const listProducts = async (req, res) => {
    try {
        const products = await productModel
            .find({})
            .select('name description price category subCategory image bestseller sizes date');

        res.json({ success: true, products });
    } catch (error) {
        console.error("List Products Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Search Products (Server-Side ReDoS-Hardened Search)
const searchProducts = async (req, res) => {
    try {
        const rawQuery = req.query.q || req.query.query || '';
        if (typeof rawQuery !== 'string') {
            return res.status(400).json({ success: false, message: "Invalid search query parameter" });
        }

        const query = rawQuery.trim();

        // Enforce maximum query length defense against string DoS
        if (query.length > 100) {
            return res.status(400).json({ success: false, message: "Search query exceeds maximum length of 100 characters." });
        }

        if (!query) {
            const products = await productModel
                .find({})
                .select('name description price category subCategory image bestseller sizes date');
            return res.json({ success: true, count: products.length, products });
        }

        const safeQuery = escapeRegex(query);
        const searchRegex = new RegExp(safeQuery, 'i');

        const products = await productModel.find({
            $or: [
                { name: searchRegex },
                { category: searchRegex },
                { subCategory: searchRegex },
                { description: searchRegex }
            ]
        }).select('name description price category subCategory image bestseller sizes date');

        res.json({ success: true, count: products.length, products });
    } catch (error) {
        console.error("Search Products Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Remove Product
const removeProduct = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: "Missing product id" });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid product ID format." });
        }

        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        await productModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Product Removed" });
    } catch (error) {
        console.error("Remove Product Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { addProduct, listProducts, searchProducts, removeProduct, escapeRegex };
