import React, { useEffect, useState } from "react";
import Link from "next/link";
import NavItem from "./NavItem";
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5005/api/', // Set your base URL here
});

const Navbar = () => {
    const [username, setUsername] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setUsername(localStorage.getItem('username'));
        checkAdminStatus();
    }, []);

    const checkAdminStatus = async () => {
        if (!username) return;
        try {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            const userId = storedUser.userId;
            const response = await api.get(`/check-admin/${userId}`);
            console.log('isAdmin Response:', response.data);
            setIsAdmin(response.data);
        } catch (error) {
            console.error('Error checking admin status:', error);
        }
    };

    const handleLogout = () => {
        // Clear local storage and redirect to logout
        localStorage.removeItem('username');
        localStorage.removeItem('user');
        localStorage.removeItem('email');
        localStorage.removeItem('token');


        window.location.href = "/";
    };

    const isUserLoggedIn = username !== null;

    console.log('Is User Logged In:', isUserLoggedIn);
    console.log('Is Admin:', isAdmin);

    return (
        <header>
            <nav className="nav">
                <Link href={"/"} passHref>
                    <img src="/logo_neoris.png" alt="Logo" className="Logo" style={{ width: '200px', height: 'auto' }} />
                </Link>

                <div className="nav__menu-bar">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <div className="nav__menu-list">
                    <div>
                        <NavItem text="Home" href="/" />
                    </div>
                    <div>
                        <NavItem text="FAQ" href="/faq" />
                    </div>
                    {isUserLoggedIn && isAdmin && (
                        <div>
                            <NavItem text="Admin Dashboard" href="/admin/adminDashboard" />
                        </div>
                    )}
                    <div>
                        {isUserLoggedIn ? (
                            <button 
                                className="nav__menu-item" 
                                onClick={handleLogout}
                                style={{ 
                                    backgroundColor: "black", 
                                    color: "white", 
                                    padding: "5px 10px", 
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}
                            >
                                Log Out
                            </button>
                        ) : (
                            <div>
                                <NavItem text="Log In" href="/log-in" />
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
