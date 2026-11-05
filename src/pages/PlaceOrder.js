import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './PlaceOrder.module.css';

const PlaceOrder = () => {
  const { all_products, cartItems, clearCart, API_URL, token, user, placeMockOrder } = useContext(ShopContext);
  const [method, setMethod] = useState('stripe');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // State for Address Form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  useEffect(() => {
    if (user?.email && !formData.email) {
      setFormData(prev => ({ ...prev, email: user.email }));
    }
  }, [user, formData.email]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  };

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
        let itemInfo = all_products.find((product) => String(product._id || product.id) === String(productId));
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
      setLoading(true);

      // 1. Prepare Order Items Array
      let orderItems = [];
      for (const cartKey in cartItems) {
        if (cartItems[cartKey] > 0) {
          const { productId, size } = parseCartKey(cartKey);
          const itemInfo = all_products.find((product) => String(product._id || product.id) === String(productId));
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

      if (orderItems.length === 0) {
        alert("Your cart is empty!");
        setLoading(false);
        return;
      }

      // 2. Prepare Payload
      let orderData = {
        userId: user?.id || "guest_user",
        items: orderItems,
        amount: totalAmount,
        address: formData,
        paymentMethod: method
      };

      const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

      // 3. Process Payment based on Method
      if (method === 'stripe') {
        try {
          const response = await axios.post(`${API_URL}/api/order/stripe`, orderData, {
            headers: authHeaders,
            timeout: 3500
          });

          if (response?.data?.success && response.data.session_url) {
            window.location.replace(response.data.session_url);
            return;
          }
        } catch (apiErr) {
          // Graceful fallback to offline simulated Stripe checkout
          console.info("[AURORA Offline Simulation] Backend Stripe indisponible. Simulation de paiement.");
          const mockOrderRes = placeMockOrder ? placeMockOrder({
            userId: user?.id || "guest_user",
            items: orderItems,
            amount: totalAmount,
            address: formData,
            paymentMethod: 'stripe',
            payment: true
          }) : null;

          clearCart();
          const mockOrderId = mockOrderRes?.order?._id || ('ord_' + Date.now());
          navigate(`/verify?success=true&orderId=${mockOrderId}`);
          return;
        }
      } else {
        // Cash On Delivery
        try {
          const response = await axios.post(`${API_URL}/api/order/place`, orderData, {
            headers: authHeaders,
            timeout: 3500
          });

          if (response?.data?.success) {
            clearCart();
            alert("Order Placed Successfully!");
            navigate(token ? '/login' : '/');
            return;
          }
        } catch (apiErr) {
          // Graceful fallback to offline simulated COD order placement
          console.info("[AURORA Offline Simulation] Backend COD indisponible. Sauvegarde dans LocalStorage.");
          if (placeMockOrder) {
            placeMockOrder({
              userId: user?.id || "guest_user",
              items: orderItems,
              amount: totalAmount,
              address: formData,
              paymentMethod: 'cod',
              payment: false
            });
          }
          clearCart();
          alert("Commande passée avec succès (Mode Démo Hors-ligne / LocalStorage) !");
          navigate(token ? '/login' : '/');
          return;
        }
      }

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Erreur de traitement. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

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

          <button className={styles.placeOrderBtn} type="submit" disabled={loading}>
            {loading ? (method === 'stripe' ? 'REDIRECTING TO STRIPE...' : 'PROCESSING...') : 'PLACE ORDER'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
