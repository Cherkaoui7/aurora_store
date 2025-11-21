import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FiTrash2 } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Cart.module.css';

const Cart = () => {
  const { all_products, cartItems, removeFromCart, getTotalCartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        // ✅ Fix 1: Compare using _id
        let itemInfo = all_products.find((product) => String(product._id) === String(item));
        if (itemInfo) {
            totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const totalAmount = getTotalCartAmount();

  if (getTotalCartItems() === 0) {
      return (
          <div className={styles.cartPage} style={{textAlign: 'center', padding: '150px 0'}}>
              <h2 style={{marginBottom: '30px', fontSize: '28px'}}>Your Cart is Empty 😔</h2>
              <Link to="/shop" className={styles.checkoutBtn} style={{display: 'inline-block', width: 'auto', padding: '15px 40px', textDecoration: 'none'}}>
                  START SHOPPING
              </Link>
          </div>
      );
  }

  return (
    <div className={styles.cartPage}>
      <div className={styles.cartTitle}>
        <h1>YOUR CART</h1>
      </div>

      <div>
        {all_products.map((product) => {
          // ✅ Fix 2: Use _id here
          if (cartItems[product._id] > 0) {
            return (
              // ✅ Fix 3: Key must use _id
              <div key={product._id} className={styles.cartItem}>
                
                {/* Image Fix (Handle local vs url) */}
                <img 
                  src={product.image[0].startsWith('http') ? product.image[0] : `http://localhost:4000/images/${product.image[0]}`} 
                  alt="" 
                  className={styles.itemImage} 
                />
                
                <div>
                  <p className={styles.itemName}>{product.name}</p> {/* MongoDB usually uses 'name', check your data! */}
                  <div className={styles.itemMeta}>
                     <span>Size: M</span> 
                  </div>
                </div>
                
                <p>${product.price.toFixed(2)}</p>
                
                {/* ✅ Fix 4: Use _id for quantity lookup */}
                <button className={styles.quantityInput}>{cartItems[product._id]}</button>
                
                <p>${(product.price * cartItems[product._id]).toFixed(2)}</p>
                
                {/* ✅ Fix 5: Pass _id to remove function */}
                <FiTrash2 
                    onClick={() => removeFromCart(product._id)} 
                    className={styles.deleteIcon} 
                />
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className={styles.cartBottom}>
        <div className={styles.cartTotal}>
          <h2>CART TOTALS</h2>
          <div className={styles.totalRow}>
             <p>Subtotal</p>
             <p>${totalAmount.toFixed(2)}</p>
          </div>
          <div className={styles.totalRow}>
             <p>Shipping Fee</p>
             <p style={{color: 'green'}}>Free</p>
          </div>
          <div className={`${styles.totalRow} ${styles.bold}`}>
             <p>Total</p>
             <p>${totalAmount.toFixed(2)}</p>
          </div>
          <button onClick={() => navigate('/place-order')} className={styles.checkoutBtn}>
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;