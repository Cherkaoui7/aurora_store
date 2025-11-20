import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const StarRating = ({ rating, setRating, isInteractive = false }) => {
  // 1. State to track which star is being hovered
  const [hover, setHover] = useState(null);

  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index} style={{ cursor: isInteractive ? 'pointer' : 'default' }}>
            {/* Hidden Radio Input for logic */}
            {isInteractive && (
                <input 
                    type="radio" 
                    name="rating" 
                    value={ratingValue} 
                    onClick={() => setRating(ratingValue)}
                    style={{ display: 'none' }}
                />
            )}

            {/* Animated Wrapper */}
            <motion.div
                whileHover={isInteractive ? { scale: 1.3, rotate: 10 } : {}}
                whileTap={isInteractive ? { scale: 0.9 } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
                <FaStar 
                    size={isInteractive ? 26 : 18} 
                    
                    // 2. FIX: Use 'hover' to determine color (Gold vs Grey)
                    // If hovered OR selected, show Gold (#ffc107)
                    color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} 
                    
                    // 3. FIX: Use 'setHover' to trigger the effect
                    onMouseEnter={() => isInteractive && setHover(ratingValue)}
                    onMouseLeave={() => isInteractive && setHover(null)}
                    
                    // Style
                    style={{ transition: "color 200ms", filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.1))" }}
                />
            </motion.div>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;