"use client";

import React from 'react';
import Link from 'next/link';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={`glass ${styles.sidebar}`}>
        <div className={styles.sidebarHeader}>
          <h3>Menu Promoteur</h3>
        </div>
        <nav className={styles.nav}>
          <Link href="/dashboard" className={`${styles.navItem} ${styles.active}`}>
            📊 Vue d'ensemble
          </Link>
          <Link href="#" className={styles.navItem}>
            📅 Mes Événements
          </Link>
          <Link href="#" className={styles.navItem}>
            🎟️ Billets & Scans
          </Link>
          <Link href="#" className={styles.navItem}>
            💰 Collectes Solidaires
          </Link>
          <Link href="#" className={styles.navItem}>
            ⚙️ Paramètres
          </Link>
        </nav>
        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn}>Déconnexion</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h2>Vue d'ensemble</h2>
          <button className="btn-primary" style={{ padding: '10px 20px' }}>+ Créer un événement</button>
        </header>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={`glass ${styles.statCard}`}>
            <div className={styles.statIcon}>🎟️</div>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Billets vendus</p>
              <h3 className={styles.statValue}>1,245</h3>
              <p className={styles.statTrend} data-trend="up">+12% cette semaine</p>
            </div>
          </div>
          
          <div className={`glass ${styles.statCard}`}>
            <div className={styles.statIcon}>💰</div>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Revenus générés</p>
              <h3 className={styles.statValue}>12.5M FCFA</h3>
              <p className={styles.statTrend} data-trend="up">+5% cette semaine</p>
            </div>
          </div>

          <div className={`glass ${styles.statCard}`}>
            <div className={styles.statIcon}>📱</div>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Billets scannés</p>
              <h3 className={styles.statValue}>840</h3>
              <p className={styles.statTrend}>En cours</p>
            </div>
          </div>
        </div>

        {/* Recent Events */}
        <section className={styles.recentSection}>
          <h3 className={styles.sectionTitle}>Événements Actifs</h3>
          <div className={`glass ${styles.tableContainer}`}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nom de l'événement</th>
                  <th>Date</th>
                  <th>Lieu</th>
                  <th>Statut</th>
                  <th>Ventes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Festival Afrobeat 2026</td>
                  <td>15 Juil 2026</td>
                  <td>Stade de l'Amitié</td>
                  <td><span className={`${styles.badge} ${styles.badgeActive}`}>Publié</span></td>
                  <td>850 / 1000</td>
                </tr>
                <tr>
                  <td>Gala de Charité - Enfants Orphelins</td>
                  <td>05 Sep 2026</td>
                  <td>Hôtel Azalaï</td>
                  <td><span className={`${styles.badge} ${styles.badgeActive}`}>Publié</span></td>
                  <td>Don Libre</td>
                </tr>
                <tr>
                  <td>Masterclass : Tech in Africa</td>
                  <td>10 Oct 2026</td>
                  <td>Palais des Congrès</td>
                  <td><span className={`${styles.badge} ${styles.badgeDraft}`}>Brouillon</span></td>
                  <td>0 / 200</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
