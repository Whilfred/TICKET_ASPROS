"use client";

import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import styles from './Navigation.module.css';

export function Navigation() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`glass ${styles.nav}`}>
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoHighlight}>ASPROS</span>
        </Link>
      </div>
      
      <div className={styles.links}>
        <Link href="/" className={styles.link}>Accueil</Link>
        <Link href="/dashboard" className={styles.link}>Dashboard</Link>
      </div>

      <div className={styles.actions}>
        <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <Link href="/login" className="btn-primary">
          Connexion
        </Link>
      </div>
    </nav>
  );
}
