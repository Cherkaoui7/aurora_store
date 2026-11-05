import React, { useState, useEffect } from 'react'
import './Orders.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const Orders = ({ token }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Fetch All Orders
    const fetchAllOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/api/order/list`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.data.success) {
                setOrders(response.data.data || []);
            } else {
                toast.error(response.data.message || "Failed to fetch orders");
            }
        } catch (error) {
            console.error("Fetch orders error:", error);
            toast.error(error.response?.data?.message || "Error fetching orders");
        } finally {
            setLoading(false);
        }
    }

    // 2. Update Status Handler
    const statusHandler = async (event, orderId) => {
        try {
            const response = await axios.post(`${API_URL}/api/order/status`, {
                orderId,
                status: event.target.value
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (response.data.success) {
                toast.success("Order status updated");
                await fetchAllOrders(); // Refresh list
            } else {
                toast.error(response.data.message || "Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error(error.response?.data?.message || "Error updating status");
        }
    }

    useEffect(() => {
        const loadOrders = async () => {
            await fetchAllOrders();
        };
        loadOrders();
    }, [token])

    return (
        <div className='order add'>
            <h3>Order Page</h3>
            {loading ? (
                <p style={{ textAlign: 'center', marginTop: '30px' }}>Loading orders...</p>
            ) : orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px 20px', color: '#666', background: 'white', borderRadius: '4px', marginTop: '20px' }}>
                    <p style={{ fontSize: '18px', fontWeight: '500' }}>No orders placed yet.</p>
                    <p style={{ fontSize: '14px', color: '#888' }}>Incoming customer orders will appear here automatically.</p>
                </div>
            ) : (
                <div className="order-list">
                    {orders.map((order, index) => {
                        const items = Array.isArray(order.items) ? order.items : [];
                        const address = order.address || {};
                        const customerName = `${address.firstName || ''} ${address.lastName || ''}`.trim() || 'Guest Customer';
                        const locationParts = [address.city, address.state, address.country, address.zipcode].filter(Boolean).join(', ');

                        return (
                            <div key={order._id || index} className='order-item'>
                                {/* Left Icon */}
                                <div className="order-item-icon">📦</div>

                                {/* Order Details */}
                                <div>
                                    <p className='order-item-food'>
                                        {items.length > 0 ? (
                                            items.map((item, itemIdx) => {
                                                const sizeLabel = item.size && item.size !== 'default' ? ` (${item.size})` : '';
                                                const separator = itemIdx === items.length - 1 ? '' : ', ';
                                                return `${item.name || 'Item'}${sizeLabel} x ${item.quantity || 1}${separator}`;
                                            })
                                        ) : (
                                            'No items specified'
                                        )}
                                    </p>
                                    <p className='order-item-name'>{customerName}</p>
                                    <div className='order-item-address'>
                                        {address.street && <p>{address.street},</p>}
                                        {locationParts ? <p>{locationParts}</p> : <p>No address specified</p>}
                                    </div>
                                    <p className='order-item-phone'>{address.phone || 'No phone provided'}</p>
                                </div>

                                {/* Meta Info */}
                                <p>Items: {items.length}</p>
                                <p>${Number(order.amount || 0).toFixed(2)}</p>

                                {/* Status Dropdown */}
                                <select onChange={(event) => statusHandler(event, order._id)} value={order.status || 'Order Placed'}>
                                    <option value="Order Placed">Order Placed</option>
                                    <option value="Packing">Packing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Out for delivery">Out for delivery</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    )
}

export default Orders
