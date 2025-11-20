import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import styles from './PlaceOrder.module.css';

const PlaceOrder = () => {
  const { all_products, cartItems } = useContext(ShopContext);
  const [method, setMethod] = useState('cod'); 
  
  // 2. Initialize Navigation
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

  // 3. Create the Submit Handler
  const onSubmitHandler = (event) => {
    event.preventDefault(); // Stop page reload
    
    // In the future, this is where we send data to the Backend
    console.log("Order Placed via", method);
    
    // For now: Show success and go to Home
    alert("Order Placed Successfully!");
    navigate('/'); 
  }

  return (
    // 4. Attach the handler to the form
    <form className={styles.placeOrder} onSubmit={onSubmitHandler}>
      
      {/* LEFT SIDE */}
      <div className={styles.leftSide}>
        <p className={styles.title}>DELIVERY INFORMATION</p>
        <div className={styles.multiFields}>
          <input type="text" placeholder="First name" required className={styles.input} />
          <input type="text" placeholder="Last name" required className={styles.input} />
        </div>
        <input type="email" placeholder="Email address" required className={styles.input} />
        <input type="text" placeholder="Street" required className={styles.input} />
        <div className={styles.multiFields}>
          <input type="text" placeholder="City" required className={styles.input} />
          <input type="text" placeholder="State" required className={styles.input} />
        </div>
        <div className={styles.multiFields}>
          <input type="text" placeholder="Zip code" required className={styles.input} />
          <input type="text" placeholder="Country" required className={styles.input} />
        </div>
        <input type="text" placeholder="Phone" required className={styles.input} />
      </div>

      {/* RIGHT SIDE */}
      <div className={styles.rightSide}>
        <div className={styles.cartTotal}>
          <h2>CART TOTALS</h2>
          <div className={styles.totalRow}>
             <p>Subtotal</p>
             <p>${totalAmount.toFixed(2)}</p>
          </div>
          <hr />
          <div className={styles.totalRow}>
             <p>Shipping Fee</p>
             <p>Free</p>
          </div>
          <hr />
          <div className={`${styles.totalRow} ${styles.bold}`}>
             <p>Total</p>
             <p>${totalAmount.toFixed(2)}</p>
          </div>
          
          <div className={styles.paymentMethods}>
              <p className={styles.paymentTitle}>PAYMENT METHOD</p>
              <div className={styles.paymentOptions}>
                  <div onClick={() => setMethod('stripe')} className={styles.paymentOption}>
                      <div className={method === 'stripe' ? `${styles.dot} ${styles.activeDot}` : styles.dot}></div>
                      <p>Stripe (Credit Card)</p>
                  </div>
                  <div onClick={() => setMethod('cod')} className={styles.paymentOption}>
                      <div className={method === 'cod' ? `${styles.dot} ${styles.activeDot}` : styles.dot}></div>
                      <p>Cash on Delivery</p>
                  </div>
              </div>
          </div>

          <button className={styles.placeOrderBtn} type="submit">PLACE ORDER</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;