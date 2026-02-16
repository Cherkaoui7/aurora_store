import productModel from "../models/productModel.js";

// Add Product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller, imageUrl } = req.body;

        // Support both file upload (memory) and direct image URL
        let imageUrls = [];
        if (req.files && req.files.image1 && req.files.image1[0]) {
            // File uploaded via multer (memory storage) — use original filename
            imageUrls.push(req.files.image1[0].originalname);
        } else if (imageUrl) {
            // Direct URL provided (for Vercel deployment)
            imageUrls.push(imageUrl);
        }

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true" ? true : false,
            image: imageUrls,
            date: Date.now()
        }

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

// List Products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

// Remove Product
const removeProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.body.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product Removed" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

export { addProduct, listProducts, removeProduct }