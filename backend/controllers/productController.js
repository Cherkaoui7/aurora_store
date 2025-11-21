import productModel from "../models/productModel.js";
import fs from 'fs';

// Add Product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Handle Image
        const image1 = req.files.image1 && req.files.image1[0];
        const images = [image1].filter((item) => item !== undefined);
        let imageUrls = images.map((item) => `${item.filename}`);

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes), // Parse string array from Admin
            bestseller: bestseller === "true" ? true : false,
            image: imageUrls,
            date: Date.now()
        }

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// List Products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Remove Product
const removeProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.body.id);
        // Optional: Delete image from uploads folder too
        if(product.image && product.image[0]) {
             fs.unlink(`uploads/${product.image[0]}`, ()=>{});
        }
        
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product Removed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { addProduct, listProducts, removeProduct }