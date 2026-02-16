import React, { useState, useEffect } from 'react'
import './Orders.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';


const Orders = () => {
    const [orders, setOrders] = useState([]);

    // 1. Fetch All Orders
    const fetchAllOrders = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/order/list`);
            if (response.data.success) {
                setOrders(response.data.data);
            } else {
                toast.error("Error");
            }
        } catch {
            toast.error("Error");
        }
    }

    // 2. Update Status Handler
    const statusHandler = async (event, orderId) => {
        try {
            const response = await axios.post(`${API_URL}/api/order/status`, {
                orderId,
                status: event.target.value
            })
            if (response.data.success) {
                await fetchAllOrders(); // Refresh list
            }
        } catch {
            console.log("Error updating status");
        }
    }

    useEffect(() => {
        const loadOrders = async () => {
            await fetchAllOrders();
        };
        loadOrders();
    }, [])

    return (
        <div className='order add'>
            <h3>Order Page</h3>
            <div className="order-list">
                {orders.map((order, index) => (
                    <div key={index} className='order-item'>
                        {/* Left Icon */}
                        <div className="order-item-icon">📦</div>

                        {/* Order Details */}
                        <div>
                            <p className='order-item-food'>
                                {order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return item.name + " x " + item.quantity
                                    } else {
                                        return item.name + " x " + item.quantity + ", "
                                    }
                                })}
                            </p>
                            <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
                            <div className='order-item-address'>
                                <p>{order.address.street + ","}</p>
                                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                            </div>
                            <p className='order-item-phone'>{order.address.phone}</p>
                        </div>

                        {/* Meta Info */}
                        <p>Items: {order.items.length}</p>
                        <p>${order.amount}</p>

                        {/* Status Dropdown */}
                        <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                            <option value="Order Placed">Order Placed</option>
                            <option value="Packing">Packing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Orders