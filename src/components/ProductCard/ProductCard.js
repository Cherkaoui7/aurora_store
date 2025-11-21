import React, { useContext } from 'react'; // Import useContext
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Import Hearts
import { ShopContext } from '../../context/ShopContext'; // Import Context
import StarRating from '../UI/StarRating';
import styles from './ProductCard.module.css';

const ProductCard = ({ id, image, title, price, rating }) => {
  // 1. Get wishlist state and toggle function
  const { wishlistItems, toggleWishlist } = useContext(ShopContext);

  // Check if this specific product is in the wishlist
  const isInWishlist = wishlistItems[id];

  const springTransition = { type: "spring", stiffness: 350, damping: 25 };

  return (
    <div className={styles.cardWrapperRelative}> {/* We need a wrapper to position the heart outside the link if needed, or manage z-index */}
      
      {/* 2. THE HEART BUTTON */}
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

      <Link to={`/product/${id}`} className={styles.cardLink}>
        <motion.div 
            className={styles.cardWrapper}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -10, boxShadow: "0 20px 30px -10px rgba(0,0,0,0.15)" }}
            viewport={{ once: true }}
        >
          <div className={styles.imageContainer}>
            <img src={image} alt={title} className={styles.image} />
            
            <motion.div 
               className={styles.quickViewPill}
               initial={{ opacity: 0, y: 20, x: "-50%" }}
               whileHover={{ opacity: 1, y: 0, x: "-50%" }}
               transition={springTransition}
            >
              Quick View
            </motion.div>
          </div>
          
          <div className={styles.details}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.ratingWrapper}>
               <StarRating rating={rating} />
            </div>
            <p className={styles.price}>${price.toFixed(2)}</p>
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

export default ProductCard;