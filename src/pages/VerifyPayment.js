import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import styles from './VerifyPayment.module.css';

const VerifyPayment = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const { clearCart, API_URL, token } = useContext(ShopContext);

    const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'failed'
    const [message, setMessage] = useState('Verifying your payment...');

    useEffect(() => {
        const verifyPayment = async () => {
            if (!orderId) {
                setStatus('failed');
                setMessage('Invalid payment parameters.');
                return;
            }

            try {
                const response = await axios.post(`${API_URL}/api/order/verify-stripe`, {
                    success,
                    orderId
                });

                if (response.data.success) {
                    clearCart();
                    setStatus('success');
                    setMessage('Your payment has been successfully processed!');
                } else {
                    setStatus('failed');
                    setMessage(response.data.message || 'Payment was not completed.');
                }
            } catch (error) {
                console.error("Payment Verification Error:", error);
                setStatus('failed');
                setMessage('Could not verify payment with the server.');
            }
        };

        verifyPayment();
    }, [success, orderId, API_URL]);

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {status === 'loading' && (
                    <>
                        <div className={styles.spinner}></div>
                        <h2 className={styles.title}>Verifying Payment</h2>
                        <p className={styles.subtitle}>Please wait while we confirm your transaction with Stripe...</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className={`${styles.iconWrapper} ${styles.iconSuccess}`}>
                            ✓
                        </div>
                        <h2 className={styles.title}>Payment Successful!</h2>
                        <p className={styles.subtitle}>{message}</p>
                        {orderId && (
                            <div className={styles.orderReference}>
                                Order Reference: #{orderId.slice(-6).toUpperCase()}
                            </div>
                        )}
                        <div className={styles.actionButtons}>
                            <Link to={token ? "/login" : "/shop"} className={styles.primaryBtn}>
                                {token ? "View Your Orders" : "Continue Shopping"}
                            </Link>
                            <Link to="/shop" className={styles.secondaryBtn}>
                                Explore More Items
                            </Link>
                        </div>
                    </>
                )}

                {status === 'failed' && (
                    <>
                        <div className={`${styles.iconWrapper} ${styles.iconFailed}`}>
                            ✕
                        </div>
                        <h2 className={styles.title}>Payment Failed or Cancelled</h2>
                        <p className={styles.subtitle}>{message}</p>
                        <div className={styles.actionButtons}>
                            <Link to="/cart" className={styles.primaryBtn}>
                                Return to Cart & Retry
                            </Link>
                            <Link to="/shop" className={styles.secondaryBtn}>
                                Continue Shopping
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default VerifyPayment;

