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
        let itemInfo = all_products.find((product) => String(product.id) === String(item));
        if (itemInfo) {
            totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const totalAmount = getTotalCartAmount();

  // Empty State
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

      {/* Note: Header is hidden in CSS, but we keep the logic simple */}

      {/* CART ITEMS LIST */}
      <div>
        {all_products.map((product) => {
          if (cartItems[product.id] > 0) {
            return (
              <div key={product.id} className={styles.cartItem}>
                
                {/* Col 1: Image */}
                <img src={product.image} alt="" className={styles.itemImage} />
                
                {/* Col 2: Title & Size */}
                <div>
                  <p className={styles.itemName}>{product.title}</p>
                  <div className={styles.itemMeta}>
                     <span>Size: M</span> 
                  </div>
                </div>
                
                {/* Col 3: Price */}
                <p>${product.price.toFixed(2)}</p>
                
                {/* Col 4: Quantity */}
                <button className={styles.quantityInput}>{cartItems[product.id]}</button>
                
                {/* Col 5: Total per item */}
                <p>${(product.price * cartItems[product.id]).toFixed(2)}</p>
                
                {/* Col 6: Delete Icon */}
                <FiTrash2 
                    onClick={() => removeFromCart(product.id)} 
                    className={styles.deleteIcon} 
                />
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* CART TOTALS SECTION */}
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
          
          <button 
            onClick={() => navigate('/place-order')} 
            className={styles.checkoutBtn}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>

    </div>
  );
};

export default Cart;