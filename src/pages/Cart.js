import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FiTrash2 } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Cart.module.css';

const Cart = () => {
  const { all_products, cartItems, removeFromCart, getTotalCartItems, API_URL } = useContext(ShopContext);
  const navigate = useNavigate();

  // Parse cart key "productId_size" into { productId, size }
  const parseCartKey = (key) => {
    const lastUnderscore = key.lastIndexOf('_');
    return {
      productId: key.substring(0, lastUnderscore),
      size: key.substring(lastUnderscore + 1)
    };
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const cartKey in cartItems) {
      if (cartItems[cartKey] > 0) {
        const { productId } = parseCartKey(cartKey);
        let itemInfo = all_products.find((product) => String(product._id) === String(productId));
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[cartKey];
        }
      }
    }
    return totalAmount;
  };

  const totalAmount = getTotalCartAmount();

  if (getTotalCartItems() === 0) {
    return (
      <div className={styles.cartPage} style={{ textAlign: 'center', padding: '150px 0' }}>
        <h2 style={{ marginBottom: '30px', fontSize: '28px' }}>Your Cart is Empty 😔</h2>
        <Link to="/shop" className={styles.checkoutBtn} style={{ display: 'inline-block', width: 'auto', padding: '15px 40px', textDecoration: 'none' }}>
          START SHOPPING
        </Link>
      </div>
    );
  }

  // Build cart entries from cartItems keys
  const cartEntries = Object.keys(cartItems)
    .filter(key => cartItems[key] > 0)
    .map(cartKey => {
      const { productId, size } = parseCartKey(cartKey);
      const product = all_products.find(p => String(p._id) === String(productId));
      return product ? { cartKey, product, size, quantity: cartItems[cartKey] } : null;
    })
    .filter(Boolean);

  return (
    <div className={styles.cartPage}>
      <div className={styles.cartTitle}>
        <h1>YOUR CART</h1>
      </div>

      <div>
        {cartEntries.map(({ cartKey, product, size, quantity }) => {
          const imgSrc = product.image[0].startsWith('http')
            ? product.image[0]
            : `${API_URL}/images/${product.image[0]}`;

          return (
            <div key={cartKey} className={styles.cartItem}>
              <img src={imgSrc} alt="" className={styles.itemImage} />

              <div>
                <p className={styles.itemName}>{product.name}</p>
                <div className={styles.itemMeta}>
                  <span>Size: {size === 'default' ? 'One Size' : size}</span>
                </div>
              </div>

              <p>${product.price.toFixed(2)}</p>
              <button className={styles.quantityInput}>{quantity}</button>
              <p>${(product.price * quantity).toFixed(2)}</p>

              <FiTrash2
                onClick={() => removeFromCart(cartKey)}
                className={styles.deleteIcon}
              />
            </div>
          );
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
            <p style={{ color: 'green' }}>Free</p>
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