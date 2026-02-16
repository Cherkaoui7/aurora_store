import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import StarRating from '../components/UI/StarRating';
import styles from './Product.module.css';

const Product = () => {
  const { productId } = useParams();
  const { all_products, addToCart, API_URL } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    if (all_products.length > 0) {
      const product = all_products.find((item) => String(item._id) === String(productId));

      if (product) {
        setProductData(product);
        const img = Array.isArray(product.image) ? product.image[0] : product.image;
        setImage(img.startsWith('http') ? img : `${API_URL}/images/${img}`);
      }
    }
  }, [productId, all_products, API_URL]);

  if (!productData) {
    return <div className="opacity-0"></div>;
  }

  const handleAddToCart = () => {
    if (productData.sizes && productData.sizes.length > 0 && !size) {
      alert('Please select a size before adding to cart.');
      return;
    }
    addToCart(productData._id, size || 'default');
  };

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
          onClick={handleAddToCart}
          className={styles.addToCartBtn}
        >
          ADD TO CART
        </button>

        <hr style={{ marginTop: '2rem', marginBottom: '2rem' }} />

        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Rate this Product</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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