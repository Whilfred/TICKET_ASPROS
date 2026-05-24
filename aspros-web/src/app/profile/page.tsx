"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './profile.module.css';

interface UserData {
  email: string;
  name: string;
  role: 'buyer' | 'promoter';
  points: number;
  phone?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    // Load simulated user session
    const localUser = localStorage.getItem('aspros_user');
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('aspros_user');
    setUser(null);
    window.location.reload();
  };

  const handleBecomePromoter = () => {
    if (user) {
      const updatedUser: UserData = {
        ...user,
        role: 'promoter'
      };
      localStorage.setItem('aspros_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      // Redirect to promoter dashboard
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle} style={{ marginBottom: '16px' }}>Mon Profil</h1>

      {user ? (
        <div className={styles.profileContent}>
          {/* User Card */}
          <div className={`glass ${styles.userCard}`}>
            <div className={styles.avatarRow}>
              <div className={styles.avatar}>
                {user.name.substring(0, 2).toUpperCase()}
              </div>
              <div className={styles.userInfo}>
                <h2 className={styles.userName}>{user.name}</h2>
                <span className={styles.roleBadge}>
                  {user.role === 'promoter' ? '💼 Promoteur' : '🎟️ Acheteur'}
                </span>
                <p className={styles.userEmail}>{user.email}</p>
              </div>
            </div>
          </div>

          {/* Loyalty Points Section */}
          <div className={`glass ${styles.pointsCard}`}>
            <div className={styles.pointsHeader}>
              <div>
                <span className={styles.pointsLabel}>POINTS DE FIDÉLITÉ</span>
                <h3 className={styles.pointsValue}>{user.points} <span className={styles.pointsUnit}>PTS</span></h3>
              </div>
              <span className={styles.pointsIcon}>👑</span>
            </div>
            <p className={styles.pointsDesc}>
              Gagnez des points à chaque billet acheté et échangez-les contre des réductions ou des dons solidaires.
            </p>
            <div className={styles.levelProgressBg}>
              <div className={styles.levelProgressFill} style={{ width: '45%' }} />
            </div>
            <div className={styles.levelLabels}>
              <span>Niveau Bronze</span>
              <span>Argent (1 000 pts)</span>
            </div>
          </div>

          {/* Action List */}
          <div className={styles.actionList}>
            <Link href="/tickets" className={styles.actionItem}>
              <div className={styles.actionIcon}>🎫</div>
              <div className={styles.actionText}>
                <span className={styles.actionTitle}>Mes Billets</span>
                <span className={styles.actionDesc}>Voir vos e-tickets et codes de scan</span>
              </div>
              <span className={styles.actionChevron}>❯</span>
            </Link>

            {user.role === 'promoter' ? (
              <Link href="/dashboard" className={styles.actionItem}>
                <div className={styles.actionIcon}>📈</div>
                <div className={styles.actionText}>
                  <span className={styles.actionTitle}>Dashboard Promoteur</span>
                  <span className={styles.actionDesc}>Gérer vos événements et scanners</span>
                </div>
                <span className={styles.actionChevron}>❯</span>
              </Link>
            ) : (
              <button onClick={handleBecomePromoter} className={styles.actionItem} style={{ width: '100%', textAlign: 'left' }}>
                <div className={styles.actionIcon}>💼</div>
                <div className={styles.actionText}>
                  <span className={styles.actionTitle}>Devenir Promoteur</span>
                  <span className={styles.actionDesc}>Créez et vendez vos propres billets</span>
                </div>
                <span className={styles.actionChevron} style={{ color: 'var(--primary-blue)' }}>❯</span>
              </button>
            )}

            {/* Simulated Toggles */}
            <div className={styles.toggleItem}>
              <div className={styles.actionIcon}>💬</div>
              <div className={styles.actionText}>
                <span className={styles.actionTitle}>Alertes WhatsApp & SMS</span>
                <span className={styles.actionDesc}>Recevoir mes billets sur mon numéro</span>
              </div>
              <label className={styles.switch}>
                <input 
                  type="checkbox" 
                  checked={notificationsEnabled} 
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>

          <button onClick={handleLogout} className={`btn-secondary ${styles.logoutBtn}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Se déconnecter
          </button>
        </div>
      ) : (
        /* Not Logged In View */
        <div className={styles.loggedOutContainer}>
          <div className={styles.welcomeCard}>
            <div className={styles.welcomeIcon}>🎟️</div>
            <h2 className={styles.welcomeTitle}>Votre Espace ASPROS</h2>
            <p className={styles.welcomeDesc}>
              Connectez-vous pour acheter des billets en un clic, retrouver vos tickets actifs, accumuler des points de fidélité et soutenir des causes.
            </p>
            
            <div className={styles.authButtons}>
              <Link href="/login" className="btn-primary" style={{ width: '100%' }}>
                Se connecter
              </Link>
              <Link href="/register" className="btn-secondary" style={{ width: '100%' }}>
                Créer un compte
              </Link>
            </div>
          </div>

          <div className={styles.featuresList}>
            <h3 className={styles.featuresTitle}>Pourquoi créer un compte ?</h3>
            
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>⚡</span>
              <div>
                <h4>Achat Express</h4>
                <p>Achetez vos billets en 10 secondes via Wave et Orange Money.</p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>🛡️</span>
              <div>
                <h4>Billets Sécurisés</h4>
                <p>Vos billets QR code sont toujours disponibles, même hors ligne.</p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>🤝</span>
              <div>
                <h4>Collecte Solidaire</h4>
                <p>Contribuez à des actions de solidarité sociale et suivez l'avancement.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
