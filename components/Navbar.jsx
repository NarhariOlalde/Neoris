import React from "react";
import Link from "next/link";
import NavItem from "./NavItem";

const MENU_LIST = [
    {
        text: "Home",
        href: "/",
    }, {
        text: "About",
        href: "/about",
    }, {
        text: "Log-in",
        href: "/log-in",
    },
]

const Navbar = () => {
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
