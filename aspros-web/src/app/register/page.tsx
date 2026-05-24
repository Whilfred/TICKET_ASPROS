"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './register.module.css';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<'buyer' | 'promoter'>('buyer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+225'); // Default Côte d'Ivoire
  const [password, setPassword] = useState('');

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return { score: 0, text: 'Vide', color: '#94a3b8' };
    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 10) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 1) return { score, text: 'Faible 🔴', color: '#ef4444' };
    if (score <= 3) return { score, text: 'Moyen 🟡', color: '#eab308' };
    return { score, text: 'Fort 🟢', color: '#10b981' };
  };

  const strength = getPasswordStrength();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API registration call
    setTimeout(() => {
      setIsLoading(false);
      // Save simulated user session
      localStorage.setItem('aspros_user', JSON.stringify({
        email: email,
        name: name || email.split('@')[0],
        role: role,
        phone: `${countryCode} ${phone}`,
        points: 100 // Welcome points
      }));
      
      // Redirect to Profile page or dashboard depending on role
      if (role === 'promoter') {
        window.location.href = '/dashboard';
      } else {
        window.location.href = '/profile';
      }
    }, 1800);
  };

  return (
    <div className={styles.container}>
      <div className={`glass ${styles.formCard} animate-fade-in`}>
        <div className={styles.header}>
          <div className={styles.logoBadge}>A</div>
          <h1 className={styles.title}>Créer un compte</h1>
          <p className={styles.subtitle}>Rejoignez la communauté ASPROS</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Role selector cards */}
          <div className={styles.roleContainer}>
            <div 
              className={`${styles.roleCard} ${role === 'buyer' ? styles.activeRole : ''}`}
              onClick={() => setRole('buyer')}
            >
              <div className={styles.roleIcon}>🎟️</div>
              <span className={styles.roleTitle}>Acheteur</span>
              <span className={styles.roleDesc}>Achat de billets & dons</span>
            </div>

            <div 
              className={`${styles.roleCard} ${role === 'promoter' ? styles.activeRole : ''}`}
              onClick={() => setRole('promoter')}
            >
              <div className={styles.roleIcon}>💼</div>
              <span className={styles.roleTitle}>Promoteur</span>
              <span className={styles.roleDesc}>Création d'événements & scan</span>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>Nom complet</label>
            <input 
              type="text" 
              id="name" 
              className="form-input" 
              placeholder="Ex: Koffi Amenan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Adresse Email</label>
            <input 
              type="email" 
              id="email" 
              className="form-input" 
              placeholder="koffi@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="phone" className={styles.label}>Numéro de Téléphone (Mobile Money)</label>
            <div className={styles.phoneInputRow}>
              <select 
                className={styles.countrySelect}
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                <option value="+225">🇨🇮 +225</option>
                <option value="+221">🇸🇳 +221</option>
                <option value="+229">🇧🇯 +229</option>
                <option value="+228">🇹🇬 +228</option>
                <option value="+223">🇲🇱 +223</option>
                <option value="+237">🇨🇲 +237</option>
                <option value="+242">🇨🇬 +242</option>
                <option value="+243">🇨🇩 +243</option>
              </select>
              <input 
                type="tel" 
                id="phone" 
                className="form-input" 
                style={{ flex: 1 }}
                placeholder="07080910"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Mot de passe</label>
            <input 
              type="password" 
              id="password" 
              className="form-input" 
              placeholder="Min. 6 caractères"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            {password && (
              <div className={styles.strengthMeterRow}>
                <span className={styles.strengthLabel}>Force :</span>
                <span className={styles.strengthVal} style={{ color: strength.color }}>
                  {strength.text}
                </span>
                <div className={styles.strengthBarBg}>
                  <div 
                    className={styles.strengthBarFill} 
                    style={{ 
                      width: `${(strength.score / 5) * 100}%`,
                      backgroundColor: strength.color 
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className={`btn-primary ${styles.submitBtn} ${isLoading ? styles.loading : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.loader}></span>
            ) : (
              'Créer mon compte'
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            Vous avez déjà un compte ? <br />
            <Link href="/login" className={styles.loginLink}>
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
