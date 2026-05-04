import React,{useState}from 'react';
import '../../CSS/task.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Orders = () => {
    const [formdata, setFormData] = useState({
        productId: '',
        quantityRequested: '',
    });
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user;

    const handleOrdersChange = (e) => {
        setFormData({ ...formdata, [e.target.id]: e.target.value });
    };

    const handleAddOrder = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!formdata.productId || !formdata.quantityRequested) {
            setError('Please fill in all fields');
            return;
        }

        const quantity = Number(formdata.quantityRequested);
        if (Number.isNaN(quantity) || quantity <= 0) {
            setError('Quantity must be a positive number');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: formdata.productId,
                    quantityRequested: quantity,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message || 'Order placed successfully');
                setFormData({ productId: '', quantityRequested: '' });
            } else {
                setError(data.error || data.message || 'Failed to place order');
            }
        } catch (err) {
            setError('An error occurred while placing the order');
        }
    };

    const fetchOrders = async () => {
        setError('');
        setMessage('');
        try {
            const response = await fetch('http://localhost:8080/getOrders',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            const data = await response.json(); 
            if (response.ok) {
                const ordersArray = data.orders ?? data.data ?? [];
                if (Array.isArray(ordersArray)) {
                    setOrders(ordersArray);
                } else {
                    setError('Invalid data format received from server');
                }   
            } else {
                setError(data.error || 'Failed to fetch orders');
            }
        } catch (err) {
            setError('An error occurred while fetching orders');
        }
    };

    return (
        <div id="container">
        <div id="card">
        <img id="logo" src="/Vend-X-logo-final-1.png" alt="VENDX Logo" />   
            <h2>Order Items</h2>
            {message && <p id="success-text">{message}</p>}
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleAddOrder} id="form">
            <div id="group">
            <label htmlFor="productId">Product ID</label>
            <input
              type="text"
              id="productId"
              placeholder="Enter Product ID"
              value={formdata.productId}
              onChange={handleOrdersChange}
              required
            />
          </div>
            <div id="group">
            <label htmlFor="quantityRequested">Quantity Requested</label>
            <input
              type="text"
              id="quantityRequested"
              placeholder="Enter Quantity Requested"
              value={formdata.quantityRequested}
              onChange={handleOrdersChange}
              required   
            />
          </div>
          <button id="btn" type="submit">Order</button>
            <div id="btn-div">
                
                <button id="btn" type="button" onClick={() => navigate('/welcome', { state: { user } })}>
                    Back to Home
                </button>
                <button id="btn" type="button" onClick={() => setOrders([])}>
                    View Orders
                </button>
            </div>
            </form>
        </div>
        </div>
    );
};

export default Orders;