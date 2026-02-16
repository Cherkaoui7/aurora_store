import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const List = ({ token }) => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/product/list`);

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error("Backend says: " + response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
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
        toast.error("Error");
      }
    } catch (error) {
      toast.error(error.message || "Error");
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
        {list.filter(item => item.image && item.image[0]).map((item) => {
          return (
            <div key={item._id} className='list-table-format'>
              <img src={item.image[0].startsWith('data:') ? item.image[0] : `${API_URL}/images/${item.image[0]}`} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeProduct(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List