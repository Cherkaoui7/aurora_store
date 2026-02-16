import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { ShopContext } from '../../context/ShopContext';
import StarRating from '../UI/StarRating'; // Make sure you have this component
import styles from './ProductCard.module.css';

const ProductCard = ({ id, image, title, price, rating }) => {

  // 1. Access Wishlist State
  const { wishlistItems, toggleWishlist, API_URL } = useContext(ShopContext);
  const isInWishlist = wishlistItems[id];

  // 2. Smart Image Logic (Handles URLs, Base64 data URLs, and Backend Uploads)
  let imageUrl = Array.isArray(image) ? image[0] : image;

  const displayImage = (imageUrl && (imageUrl.startsWith('http') || imageUrl.startsWith('data:')))
    ? imageUrl
    : `${API_URL}/images/${imageUrl}`;

  // Animation Config
  const springTransition = { type: "spring", stiffness: 350, damping: 25 };

  return (
    <div className={styles.cardWrapperRelative}> {/* Relative wrapper for Heart positioning */}

      {/* --- HEART BUTTON (Absolute Positioned) --- */}
      <motion.button
        className={styles.wishlistBtn}
        onClick={(e) => {
          e.preventDefault(); // Prevent clicking the card link
          toggleWishlist(id);
        }}
        whileTap={{ scale: 0.8 }}
        whileHover={{ scale: 1.1 }}
      >
        {isInWishlist ? <FaHeart color="#ff4d4d" /> : <FaRegHeart />}
      </motion.button>

      {/* --- MAIN CARD LINK --- */}
      <Link to={`/product/${id}`} className={styles.cardLink}>
        <motion.div
          className={styles.cardWrapper}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{
            y: -10,
            scale: 1.02,
            boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.15)"
          }}
          viewport={{ once: true }}
        >
          {/* Image Area */}
          <div className={styles.imageContainer}>
            <motion.img
              src={displayImage}
              alt={title}
              className={styles.image}
              whileHover={{ scale: 1.08 }}
              transition={springTransition}
            />

            {/* The Floating "Pill" Button */}
            <motion.div
              className={styles.quickViewPill}
              initial={{ opacity: 0, y: 20, x: "-50%" }}
              whileHover={{ opacity: 1, y: 0, x: "-50%" }}
              transition={springTransition}
            >
              Quick View
            </motion.div>
          </div>

          {/* Details Area */}
          <div className={styles.details}>
            <h3 className={styles.title}>{title}</h3>

            <div className={styles.ratingWrapper}>
              <StarRating rating={rating} />
            </div>

            {/* Safely handle price formatting */}
            <p className={styles.price}>${Number(price).toFixed(2)}</p>
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

export default ProductCard;