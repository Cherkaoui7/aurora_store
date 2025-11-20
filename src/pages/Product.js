import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import StarRating from '../components/UI/StarRating'; // Import Star Component
import styles from './Product.module.css';

const Product = () => {
  const { productId } = useParams();
  const { all_products, addToCart } = useContext(ShopContext);
  
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  
  // NEW: State for User's Review
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    const product = all_products.find((item) => String(item.id) === String(productId));
    if (product) {
      setProductData(product);
      setImage(product.image);
      setSize('');
    }
  }, [productId, all_products]);

  if (!productData) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className={styles.container}>
      {/* ... (Gallery Code stays the same) ... */}
      <div className={styles.gallery}>
        <div className={styles.thumbnailList}>
           <img src={productData.image} className={`${styles.thumbnail} ${styles.activeThumbnail}`} alt="" />
        </div>
        <div className={styles.mainImageContainer}>
          <img src={image} className={styles.mainImage} alt={productData.title} />
        </div>
      </div>

      {/* INFO SECTION */}
      <div className={styles.info}>
        <h1 className={styles.title}>{productData.title}</h1>
        
        {/* READ-ONLY RATING (Average) */}
        <div className={styles.rating}>
           <StarRating rating={productData.rating} />
           <span className="pl-2 text-gray-500">(122 reviews)</span>
        </div>

        <p className={styles.price}>${productData.price.toFixed(2)}</p>
        <p className={styles.description}>{productData.description}</p>

        {/* Size Selector */}
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
            onClick={() => addToCart(productData.id)} 
            className={styles.addToCartBtn}
        >
            ADD TO CART
        </button>
        
        <hr className="mt-8 mb-8 sm:w-4/5" />

        {/* NEW: INTERACTIVE REVIEW SECTION */}
        <div className="mt-6">
            <h3 className="text-lg font-bold mb-2">Rate this Product</h3>
            <p className="text-sm text-gray-500 mb-3">Tell us what you think!</p>
            
            {/* Interactive Stars */}
            <div className="flex items-center gap-4">
                <StarRating 
                    rating={userRating} 
                    setRating={setUserRating} 
                    isInteractive={true} 
                />
                {userRating > 0 && <span className="text-green-600 text-sm font-medium">Thanks for rating {userRating} stars!</span>}
            </div>
        </div>

        <div className="text-sm text-gray-500 mt-8 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available.</p>
        </div>
      </div>
    </div>
  );
};

export default Product;