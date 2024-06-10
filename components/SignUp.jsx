import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../pages/context/UserContext';

function SignUp() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [sex, setSex] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useUser();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5005/api/signup', {
                email,
                name,
                lastName,
                sex,
                gender,
                age,
                password
            });
            if (data.message === 'User created successfully') {
                localStorage.setItem('token', data.token);
                localStorage.setItem('email', email);
                setUser({ userId: data.userId });
                console.log('Signed up user:', data.userId);
                window.location.href = '/'; // Redirect to homepage
            } else {
                alert('Sign up failed: ' + data.message);
            }
        } catch (error) {
            alert('Sign up failed: ' + (error.response ? error.response.data.message : 'Server error'));
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <label className="signup-label">
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="signup-input" />
                </label>
                <label className="signup-label">
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="signup-input" />
                </label>
                <label className="signup-label">
                    Last Name:
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="signup-input" />
                </label>
                <label className="signup-label">
                    Sex:
                    <input type="text" value={sex} onChange={(e) => setSex(e.target.value)} className="signup-input" />
                </label>
                <label className="signup-label">
                    Gender:
                    <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} className="signup-input" />
                </label>
                <label className="signup-label">
                    Age:
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="signup-input" />
                </label>
                <label className="signup-label">
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="signup-input" />
                </label>
                <button type="submit" className="signup-button">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
