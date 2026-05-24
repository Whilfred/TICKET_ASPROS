"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import styles from './Navigation.module.css';

// Custom SVG Icons for a premium look
const HomeIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "var(--primary-blue)" : "none"} stroke={active ? "var(--primary-blue)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const SearchIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "var(--primary-blue)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const TicketIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "var(--primary-blue)" : "none"} stroke={active ? "var(--primary-blue)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <line x1="13" y1="5" x2="13" y2="19" strokeDasharray="4 4" />
  </svg>
);

const UserIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "var(--primary-blue)" : "none"} stroke={active ? "var(--primary-blue)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

export function NavigationHeader() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`glass ${styles.header}`}>
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>ASPROS</span>
        </Link>
      </div>
      
      <div className={styles.headerActions}>
        <button onClick={toggleTheme} className={styles.actionBtn} aria-label="Toggle theme">
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
        <button className={styles.actionBtn} aria-label="Notifications" style={{ position: 'relative' }}>
          <BellIcon />
          <span className={styles.notificationBadge}></span>
        </button>
      </div>
    </header>
  );
}

export function NavigationTabBar() {
  const pathname = usePathname();

  const tabs = [
    { name: 'Accueil', path: '/', icon: HomeIcon },
    { name: 'Explorer', path: '/explore', icon: SearchIcon },
    { name: 'Tickets', path: '/tickets', icon: TicketIcon },
    { name: 'Profil', path: '/profile', icon: UserIcon },
  ];

  return (
    <nav className={`glass ${styles.tabBar}`}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.path || 
          (tab.path !== '/' && pathname.startsWith(tab.path));
        const IconComponent = tab.icon;

        return (
          <Link 
            key={tab.name} 
            href={tab.path} 
            className={`${styles.tabItem} ${isActive ? styles.activeTab : ''}`}
          >
            <div className={styles.iconWrapper}>
              <IconComponent active={isActive} />
            </div>
            <span className={styles.tabLabel}>{tab.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}

// Fallback legacy export
export function Navigation() {
  return null;
}

