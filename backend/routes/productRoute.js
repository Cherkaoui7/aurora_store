import express from 'express';
import { addProduct, listProducts, removeProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';

const productRouter = express.Router();

productRouter.post('/add', upload.fields([{name:'image1', maxCount:1}]), addProduct);
productRouter.post('/remove', removeProduct);
productRouter.get('/list', listProducts);

export default productRouter;