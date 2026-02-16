import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './PlaceOrder.module.css';

const PlaceOrder = () => {
  const { all_products, cartItems, clearCart, API_URL } = useContext(ShopContext);
  const [method, setMethod] = useState('cod');
  const navigate = useNavigate();

  // State for Address Form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }))
  }

  // Parse cart key
  const parseCartKey = (key) => {
    const lastUnderscore = key.lastIndexOf('_');
    return {
      productId: key.substring(0, lastUnderscore),
      size: key.substring(lastUnderscore + 1)
    };
  };

  // Calculate Total
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

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      // 1. Prepare Order Items Array
      let orderItems = [];
      for (const cartKey in cartItems) {
        if (cartItems[cartKey] > 0) {
          const { productId, size } = parseCartKey(cartKey);
          const itemInfo = all_products.find((product) => String(product._id) === String(productId));
          if (itemInfo) {
            let itemCopy = {
              ...itemInfo,
              size: size === 'default' ? 'One Size' : size,
              quantity: cartItems[cartKey]
            };
            orderItems.push(itemCopy);
          }
        }
      }

      // 2. Prepare Payload
      let orderData = {
        userId: "guest_user",
        items: orderItems,
        amount: totalAmount,
        address: formData,
        paymentMethod: method
      }

      // 3. Send to Backend
      const response = await axios.post(`${API_URL}/api/order/place`, orderData);

      if (response.data.success) {
        clearCart();
        alert("Order Placed Successfully!");
        navigate('/');
      } else {
        alert("Error placing order");
      }

    } catch (error) {
      console.error(error);
      alert("Error connecting to server");
    }
  }

  return (
    <form className={styles.placeOrder} onSubmit={onSubmitHandler}>

      {/* LEFT SIDE */}
      <div className={styles.leftSide}>
        <p className={styles.title}>DELIVERY INFORMATION</p>
        <div className={styles.multiFields}>
          <input name='firstName' onChange={onChangeHandler} value={formData.firstName} type="text" placeholder="First name" required className={styles.input} />
          <input name='lastName' onChange={onChangeHandler} value={formData.lastName} type="text" placeholder="Last name" required className={styles.input} />
        </div>
        <input name='email' onChange={onChangeHandler} value={formData.email} type="email" placeholder="Email address" required className={styles.input} />
        <input name='street' onChange={onChangeHandler} value={formData.street} type="text" placeholder="Street" required className={styles.input} />
        <div className={styles.multiFields}>
          <input name='city' onChange={onChangeHandler} value={formData.city} type="text" placeholder="City" required className={styles.input} />
          <input name='state' onChange={onChangeHandler} value={formData.state} type="text" placeholder="State" required className={styles.input} />
        </div>
        <div className={styles.multiFields}>
          <input name='zipcode' onChange={onChangeHandler} value={formData.zipcode} type="text" placeholder="Zip code" required className={styles.input} />
          <input name='country' onChange={onChangeHandler} value={formData.country} type="text" placeholder="Country" required className={styles.input} />
        </div>
        <input name='phone' onChange={onChangeHandler} value={formData.phone} type="text" placeholder="Phone" required className={styles.input} />
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