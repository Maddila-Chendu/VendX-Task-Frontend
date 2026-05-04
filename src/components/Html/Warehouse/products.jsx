import React, { useState } from 'react';
import '../../CSS/task.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Products = () => {
    const [formdata, setFormData] = useState({
        name: '',
        description: ''
    });
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user;

    const handleProductsChange = (e) => {  
        setFormData({ ...formdata, [e.target.id]: e.target.value });
    };
    const handleAddProduct = async (e) => {
        e.preventDefault();
        setError('');

        if (!formdata.name || !formdata.description) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({  
                    name: formdata.name,
                    description: formdata.description
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Product added successfully');
                setFormData({ name: '', description: '' });
            } else {
                setError(data.error || data.message || 'Failed to add product');
            }
        } catch (err) {
            setError('An error occurred while adding the product');
        }
    };

    const fetchProducts = async () => {
        setError('');
        setMessage('');
        try {
            const response = await fetch('http://localhost:8080/getProduct');
            const data = await response.json();
            if (response.ok) {
                const productsArray = data.products ?? data.data ?? [];
                if (Array.isArray(productsArray)) {
                    setProducts(productsArray);
                    if (productsArray.length === 0) {
                        setMessage('No products found');
                    }
                } else {
                    setError('Invalid response format');
                }
            } else {
                setError(data.error || data.message || 'Failed to fetch products');
            }  
        } catch (err) {
            setError('An error occurred while fetching products');
        }
    };

    return (
        <div id="container">
        <div id="card">
        <img id="logo" src="/Vend-X-logo-final-1.png" alt="VENDX Logo" />   
            <h2>Add Product</h2>
            {message && <p id="success-text">{message}</p>}
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleAddProduct} id="form">
            <div id="group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Product Name"
              value={formdata.name}
              onChange={handleProductsChange}
              required
            />
          </div>
            <div id="group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter Product Description"
              value={formdata.description}
              onChange={handleProductsChange}
              required   
            />
          </div>
          <button id="btn" type="submit">Add Product</button>
            <div id="btn-div">
                
                <button id="btn" type="button" onClick={() => navigate('/welcome', { state: { user } })}>
                    Back to Home
                </button>
                <button id="btn" type="button" onClick={fetchProducts}>
                    View Products
                </button>
            </div>
            </form>
        </div>
        </div>
    );
}   
export default Products;