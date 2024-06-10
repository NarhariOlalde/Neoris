import React from "react";
import { useRouter } from "next/router";

const NavItem = ({ href, text, active }) => {
    const router = useRouter();

    const handleClick = (e) => {
        e.preventDefault();
        router.push(href);
    };

    return (
        <div className={`nav__link ${active ? "active" : ""}`}>
            <a href={href} onClick={handleClick}>
                {text}
            </a>
        </div>
    );
}

export default NavItem;
