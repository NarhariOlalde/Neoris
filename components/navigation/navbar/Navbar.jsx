import React, { useEffect, useState } from "react";
import Link from "next/link";
import NavItem from "./NavItem";

const Navbar = () => {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        setUsername(localStorage.getItem('username'));
    }, []);

    const isUserLoggedIn = username !== null;

    const MENU_LIST = [
        {
            text: "Home",
            href: "/",
        }, {
            text: "FAQ",
            href: "/faq",
        }, {
            text: username || "Log-in", // Display username if exists, else display "Log-in"
            href: isUserLoggedIn ? "/" : "/log-in", // If user is logged in, link to home page, else link to log-in page
            style: isUserLoggedIn ? { backgroundColor: "black", color: "white", padding: "5px 10px", borderRadius: "5px" } : {}, // Apply inline style if user is signed in
        },
    ];

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
                    {MENU_LIST.map((menu, idx) => (
                        <div key={menu.text}>
                            <NavItem {...menu} />
                        </div>
                    ))}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;