import React, { useState } from 'react'
import './Add.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const Add = ({ token }) => {
    const [image, setImage] = useState(false);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("Topwear");
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSizeToggle = (size) => {
        setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!image) {
            toast.error("Please select a product image before uploading.");
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("name", name.trim());
            formData.append("description", desc.trim());
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestseller", bestseller ? "true" : "false");
            formData.append("sizes", JSON.stringify(sizes));
            formData.append("image1", image);

            const response = await axios.post(`${API_URL}/api/product/add`, formData, {
                headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
            });

            if (response.data.success) {
                toast.success(response.data.message || "Product added successfully");
                setName("");
                setDesc("");
                setPrice("");
                setImage(false);
                setSizes([]);
                setBestseller(false);
            } else {
                toast.error(response.data.message || "Failed to add product");
            }
        } catch (error) {
            console.error("Add product error:", error);
            toast.error(error.response?.data?.message || error.message || "Failed to add product");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <div className="upload-area" style={{ border: !image ? '2px dashed #bbb' : '2px solid #333' }}>
                            {image ? (
                                <img src={URL.createObjectURL(image)} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <span>Click to Upload Image</span>
                            )}
                        </div>
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" accept="image/*" hidden />
                </div>

                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Type here' required />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={(e) => setDesc(e.target.value)} value={desc} rows="6" placeholder='Content' required></textarea>
                </div>

                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select onChange={(e) => setCategory(e.target.value)} value={category} name="category">
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                    </div>
                    <div className="add-category flex-col">
                        <p>Sub category</p>
                        <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} name="subCategory">
                            <option value="Topwear">Topwear</option>
                            <option value="Bottomwear">Bottomwear</option>
                            <option value="Winterwear">Winterwear</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" min="0" step="0.01" placeholder='25' required />
                    </div>
                </div>

                <div className="add-sizes flex-col">
                    <p>Product Sizes</p>
                    <div className="sizes-container">
                        {["S", "M", "L", "XL", "XXL"].map((size) => (
                            <div key={size} onClick={() => handleSizeToggle(size)} className={`size-box ${sizes.includes(size) ? 'active-size' : ''}`}>{size}</div>
                        ))}
                    </div>
                </div>

                <div className="add-bestseller-wrapper" style={{ margin: '15px 0' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}>
                        <input
                            type="checkbox"
                            checked={bestseller}
                            onChange={(e) => setBestseller(e.target.checked)}
                            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>Mark as Bestseller / Featured Product</span>
                    </label>
                </div>

                <button type="submit" className='add-btn' disabled={loading}>
                    {loading ? 'ADDING...' : 'ADD PRODUCT'}
                </button>
            </form>
        </div>
    )
}
export default Add
