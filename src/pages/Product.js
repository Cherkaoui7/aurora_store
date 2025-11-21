import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import StarRating from '../components/UI/StarRating'; 
import styles from './Product.module.css';

const Product = () => {
  const { productId } = useParams();
  const { all_products, addToCart } = useContext(ShopContext);
  
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    // DEBUG LOGS: Open Console (F12) to see these
    console.log("🔍 Current URL ID:", productId);
    console.log("📦 Products available:", all_products.length);

    // Only run if products have loaded from the server
    if (all_products.length > 0) {
        
        // Find the product by ID
        const product = all_products.find((item) => String(item._id) === String(productId));
        
        if (product) {
            console.log("✅ Product Found:", product.name);
            setProductData(product);
            
            // Handle image logic
            const img = Array.isArray(product.image) ? product.image[0] : product.image;
            // If image is a filename (not http), add localhost path
            setImage(img.startsWith('http') ? img : `http://localhost:4000/images/${img}`);
        } else {
            console.error("❌ Product NOT found for ID:", productId);
        }
    }
  }, [productId, all_products]);

  // Loading State
  if (!productData) {
      // Optional: Add a check if we waited too long
      return <div className="opacity-0"></div>; // Hide "Loading..." text if you prefer clean UI
  }

  return (
    <div className={styles.container}>
      {/* GALLERY */}
      <div className={styles.gallery}>
        <div className={styles.thumbnailList}>
           <img src={image} className={`${styles.thumbnail} ${styles.activeThumbnail}`} alt="" />
        </div>
        <div className={styles.mainImageContainer}>
          <img src={image} className={styles.mainImage} alt={productData.name} />
        </div>
      </div>

      {/* INFO */}
      <div className={styles.info}>
        <h1 className={styles.title}>{productData.name}</h1>
        
        <div className={styles.rating}>
           <StarRating rating={4} />
           <span className="pl-2 text-gray-500">(122 reviews)</span>
        </div>

        <p className={styles.price}>${Number(productData.price).toFixed(2)}</p>
        <p className={styles.description}>{productData.description}</p>

        <div className={styles.sizeContainer}>
          <p>Select Size</p>
          <div className={styles.sizes}>
            {productData.sizes?.map((item, index) => (
              <button 
                key={index} 
                onClick={() => setSize(item)}
                className={`${styles.sizeBtn} ${item === size ? styles.activeSize : ''}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <button 
            onClick={() => addToCart(productData._id)} 
            className={styles.addToCartBtn}
        >
            ADD TO CART
        </button>
        
        <hr className="mt-8 mb-8 sm:w-4/5" />

        <div className="mt-6">
            <h3 className="text-lg font-bold mb-2">Rate this Product</h3>
            <div className="flex items-center gap-4">
                <StarRating 
                    rating={userRating} 
                    setRating={setUserRating} 
                    isInteractive={true} 
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Product;