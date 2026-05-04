import React from 'react';
import '../../CSS/task.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Inventory = () => {
    const [fromdata, setFormData] = React.useState({
        productId: '',
        quantity: '',
        expiryDate: '',
    });
    const [inventory, setInventory] = React.useState([]);
    const [message, setMessage] = React.useState('');
    const [error, setError] = React.useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user;

    const handleInventoryChange = (e) => {
        setFormData({ ...fromdata, [e.target.id]: e.target.value });
    };
    const handleAddInventory = async (e) => {
        e.preventDefault();
        setError('');
        if (!fromdata.productId || !fromdata.quantity || !fromdata.expiryDate) {
            setError('Please fill in all fields');
            return;
        }
        const quantity = Number(fromdata.quantity);
        if (Number.isNaN(quantity) || quantity <= 0) {
            setError('Quantity must be a positive number');
            return;
        }
        try {
            const response = await fetch('http://localhost:8080/IBatch', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: fromdata.productId,
                    quantity: quantity,
                    expiryDate: fromdata.expiryDate,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Stock added successfully');
                setFormData({ productId: '', quantity: '', expiryDate: '' });
            } else {
                setError(data.error || 'Failed to add stock');
            }
        } catch (err) {
            setError('An error occurred while adding the stock');
        }
    };

    return (
        <div id="container">
        <div id="card">
        <img id="logo" src="/Vend-X-logo-final-1.png" alt="VENDX Logo" />   
            <h2>Add Stock</h2>
            {message && <p id="success-text">{message}</p>}
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleAddInventory} id="form">
            <div id="group">
            <label htmlFor="productId">Product ID</label>
            <input
              type="text"
              id="productId"
              placeholder="Enter Product ID"
              value={fromdata.productId}
              onChange={handleInventoryChange}
              required
            />
          </div>
            <div id="group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="text"
              id="quantity"
              placeholder="Enter Quantity"
              value={fromdata.quantity}
              onChange={handleInventoryChange}
              required   
            />
          </div>
          <div id="group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="date"
              id="expiryDate"
              placeholder='Select Expiry Date'
              value={fromdata.expiryDate}
              onChange={handleInventoryChange}
              required
            />
          </div>
          <button id="btn" type="submit">Add</button>
            <div id="btn-div">
                
                <button id="btn" type="button" onClick={() => navigate('/welcome', { state: { user } })}>
                    Back to Home
                </button>
                <button id="btn" type="button" onClick={() => setInventory([])}>
                    View Inventory
                </button>
            </div>
            </form>
        </div>
        </div>
    );
};

export default Inventory;