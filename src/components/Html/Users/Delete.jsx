import React ,{useState} from "react";
import { useNavigate,useLocation } from "react-router-dom";
import '../../CSS/./task.css';

function Delete() {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user;
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const response = await fetch('http://localhost:8080/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Deleted successfully');
                setUsername('');
            } else {
                setError(data.error || 'Failed to delete');
            }
        } catch (err) {
            setError('Network error. Please try again later.');
        }
    };
    return (
        <div id="container">
            <div id="card">
                <img id="logo" src="/Vend-X-logo-final-1.png" alt="VENDX Logo" />
                <h2>Delete User Here</h2>
                {message && <p id="message">{message}</p>}
                {error && <p id="error-text">{error}</p>}
                <form onSubmit={handleDelete} id="form">
                    <div id="group">
                        <label htmlFor="username">Enter Your Username : </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter Username"
                            value={username}
                            onChange={handleUsernameChange}
                            required
                        />
                    </div>
                    <button type="submit" id="btn">Delete</button><br />
                    <button type="button" id="btn" onClick={() => navigate('/welcome', { state: { user } })}>Cancel</button>
                </form>
            </div>
        </div>
    );
}
export default Delete;