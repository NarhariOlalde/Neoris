
// components/Sidebar.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from './sidebar.module.css'; // Create this file for styles

const Sidebar = () => {
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        document.body.classList.toggle('collapsed', collapsed);
    }, [collapsed]);

    const handleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <nav className={styles.sidebar}>
            <div className={styles.sidebarTop}>
                <Link href="/" className={styles.logoWrapper}>
                    <img src="/logo_neoris_white.png" alt="Logo" className={styles.logo} />
                    <h1 className={styles.hide}>Neoris Admin</h1>
                </Link>
            </div>
            <div className={styles.sidebarLinks}>
                <ul>
                    <li>
                        <Link legacyBehavior href="/">
                            <a className={`${styles.tooltip} ${router.pathname === '/dashboard' ? styles.active : ''}`}>
                                <img src="/dashboard.svg" alt="adminDashboard" />
                                <span className={styles.link}>Home Page</span>
                                <span className={styles.tooltipContent}>Home Page</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="/admin/adminDashboard">
                            <a className={`${styles.tooltip} ${router.pathname === '/admin/adminDashboard' ? styles.active : ''}`}>
                                <img src="/analytics.svg" alt="#" />
                                <span className={styles.link}>User Table</span>
                                <span className={styles.tooltipContent}>User Table</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="/faq">
                            <a className={`${styles.tooltip} ${router.pathname === '/faq' ? styles.active : ''}`}>
                                <img src="/performance.svg" alt="#" />
                                <span className={styles.link}>FAQ</span>
                                <span className={styles.tooltipContent}>FAQ</span>
                            </a>
                        </Link>
                    </li>
                    
                </ul>
            </div>
            <div className={styles.sidebarBottom}>
                
                <div className={styles.sidebarProfile}>
                    <div className={styles.avatarWrapper}>
                    </div>
                    <div className={styles.avatarName}>
                        <div className={styles.userName}>Joe Doe</div>
                        <div className={styles.email}>joe.doe@neoris.ai</div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
