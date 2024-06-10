import React, { useState } from 'react';
import axios from 'axios';

// Historia #5
// Título: Crear página de inicio de sesión (Log In) con conexión a la API
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5005/api/login', { username, password });
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', username); // Store username
                window.location.href = '/'; // Redirect to homepage
            } else {
                alert('Login failed: ' + data.message); // Show failure message from server
            }
        } catch (error) {
            alert('Login failed: ' + (error.response ? error.response.data.message : 'Server error'));
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <label className="login-label">
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="login-input" />
                </label>
                <label className="login-label">
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" />
                </label>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
}

export default Login;
