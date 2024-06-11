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
                        <Link legacyBehavior href="/dashboard">
                            <a className={`${styles.tooltip} ${router.pathname === '/dashboard' ? styles.active : ''}`}>
                                <img src="/dashboard.svg" alt="Dashboard" />
                                <span className={styles.link}>Home Page</span>
                                <span className={styles.tooltipContent}>Home Page</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="/analytics">
                            <a className={`${styles.tooltip} ${router.pathname === '/analytics' ? styles.active : ''}`}>
                                <img src="/analytics.svg" alt="Analytics" />
                                <span className={styles.link}>User Table</span>
                                <span className={styles.tooltipContent}>User Table</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="/performance">
                            <a className={`${styles.tooltip} ${router.pathname === '/performance' ? styles.active : ''}`}>
                                <img src="/performance.svg" alt="Performance" />
                                <span className={styles.link}>FAQ</span>
                                <span className={styles.tooltipContent}>FAQ</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="/funds">
                            <a className={`${styles.tooltip} ${router.pathname === '/funds' ? styles.active : ''}`}>
                                <img src="/funds.svg" alt="Funds" />
                                <span className={styles.link}>Funds</span>
                                <span className={styles.tooltipContent}>Funds</span>
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={styles.sidebarBottom}>
                <div className={styles.sidebarLinks}>
                    <ul>
                        <li>
                            <Link legacyBehavior href="/help">
                                <a className={`${styles.tooltip} ${router.pathname === '/help' ? styles.active : ''}`}>
                                    <img src="/help.svg" alt="Help" />
                                    <span className={styles.link}>Help</span>
                                    <span className={styles.tooltipContent}>Help</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link legacyBehavior href="/settings">
                                <a className={`${styles.tooltip} ${router.pathname === '/settings' ? styles.active : ''}`}>
                                    <img src="/settings.svg" alt="Settings" />
                                    <span className={styles.link}>Settings</span>
                                    <span className={styles.tooltipContent}>Settings</span>
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
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
