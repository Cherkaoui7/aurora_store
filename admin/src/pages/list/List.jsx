import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = () => {
  
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/product/list');
      
      // DEBUG LOG: See what the backend sent back
      console.log("Backend Response:", response.data);

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error("Backend says: " + response.data.message);
      }
    } catch (error) {
      // DEBUG LOG: See the real crash reason
      console.error("Fetch Error:", error);
      toast.error(error.message); // Displays "Network Error" or similar
    }
  }

  const removeProduct = async (productId) => {
    try {
      const response = await axios.post('http://localhost:4000/api/product/remove', { id: productId });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error("Remove Error:", error);
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
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={'http://localhost:4000/images/' + item.image[0]} alt="" />
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