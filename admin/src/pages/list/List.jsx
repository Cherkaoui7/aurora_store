import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const List = ({ token }) => {

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/product/list`);

      if (response.data.success) {
        setList(response.data.products || []);
      } else {
        toast.error("Backend says: " + response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const removeProduct = async (productId) => {
    try {
      const response = await axios.post(`${API_URL}/api/product/remove`, { id: productId }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message || "Failed to remove product");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Error");
    }
  }

  useEffect(() => {
    const loadList = async () => {
      await fetchList();
    };
    loadList();
  }, [])

  return (
    <div className='list-add flex-col'>
      <p>All Products List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {loading ? (
          <p style={{ textAlign: 'center', padding: '20px', gridColumn: '1/-1' }}>Loading catalog...</p>
        ) : list.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '20px', gridColumn: '1/-1' }}>No products in database.</p>
        ) : (
          list.map((item) => {
            const rawImg = Array.isArray(item.image) ? item.image[0] : item.image;
            const imgSrc = !rawImg
              ? '/placeholder.png'
              : (rawImg.startsWith('http') || rawImg.startsWith('data:'))
                ? rawImg
                : `${API_URL}/images/${rawImg}`;

            return (
              <div key={item._id} className='list-table-format'>
                <img src={imgSrc} alt={item.name || 'Product'} />
                <p>{item.name || 'Untitled'}</p>
                <p>{item.category || '-'}</p>
                <p>${Number(item.price || 0).toFixed(2)}</p>
                <p onClick={() => removeProduct(item._id)} className='cursor' title="Delete product">X</p>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default List
