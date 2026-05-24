"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './login.module.css';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Save simulated user session
      localStorage.setItem('aspros_user', JSON.stringify({
        email: email,
        name: email.split('@')[0],
        role: 'buyer',
        points: 450
      }));
      window.location.href = '/profile';
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <div className={`glass ${styles.formCard} animate-fade-in`}>
        <div className={styles.header}>
          <div className={styles.logoBadge}>A</div>
          <h1 className={styles.title}>Bienvenue</h1>
          <p className={styles.subtitle}>Connectez-vous à votre compte ASPROS</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Adresse Email</label>
            <input 
              type="email" 
              id="email" 
              className="form-input" 
              placeholder="nom@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.labelRow}>
              <label htmlFor="password" className={styles.label}>Mot de passe</label>
              <Link href="#" className={styles.forgotPassword}>Oublié ?</Link>
            </div>
            <input 
              type="password" 
              id="password" 
              className="form-input" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button 
            type="submit" 
            className={`btn-primary ${styles.submitBtn} ${isLoading ? styles.loading : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.loader}></span>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            Nouveau sur ASPROS ? <br />
            <Link href="/register" className={styles.registerLink}>
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

