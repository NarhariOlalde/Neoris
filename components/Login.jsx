import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../pages/context/UserContext';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useUser();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Submitting with:', { username, password });

        try {
            const { data } = await axios.post('http://localhost:5005/api/login', { username, password });
            console.log('Login response:', data);

            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', username);
                setUser({ userId: data.userId });
                console.log('Logged in user:', data.userId);
                window.location.href = '/';
            } else {
                alert('Login failed: ' + data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed: ' + (error.response ? error.response.data.message : 'Server error'));
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <label className="login-label">
                    Username:
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => {
                            setUsername(e.target.value);
                            console.log('Username updated:', e.target.value);
                        }} 
                        className="login-input" 
                        required 
                    />
                </label>
                <label className="login-label">
                    Password:
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => {
                            setPassword(e.target.value);
                            console.log('Password updated:', e.target.value);
                        }} 
                        className="login-input" 
                        required 
                    />
                </label>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
}

export default Login;
