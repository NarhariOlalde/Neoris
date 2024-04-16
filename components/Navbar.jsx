import React from "react";
import Link from "next/link";
import NavItem from "./NavItem";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        setUsername(localStorage.getItem('username'));
    }, []);

    const MENU_LIST = [
        {
            text: "Home",
            href: "/",
        }, {
            text: "About",
            href: "/about",
        }, {
            text: username || "Log-in", // Display username if exists, else display "Log-in"
            href: "/log-in",
        },
    ]

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
                    {MENU_LIST.map((menu, idx) => {
                        return (
                            <div key={menu.text}>
                                <NavItem {...menu} />
                            </div>
                        )
                    })}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
