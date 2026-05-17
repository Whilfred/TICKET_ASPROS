"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './login.module.css';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <div className={styles.container}>
      {/* Background decorations */}
      <div className={`${styles.blob} ${styles.blob1}`}></div>
      <div className={`${styles.blob} ${styles.blob2}`}></div>
      
      <div className={`glass ${styles.formCard} animate-fade-in`}>
        <div className={styles.header}>
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
              placeholder="vous@exemple.com"
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.labelRow}>
              <label htmlFor="password" className={styles.label}>Mot de passe</label>
              <Link href="#" className={styles.forgotPassword}>Mot de passe oublié ?</Link>
            </div>
            <input 
              type="password" 
              id="password" 
              className="form-input" 
              placeholder="••••••••"
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
          <p>Nouveau sur ASPROS ? <Link href="#" className={styles.registerLink}>Créer un compte</Link></p>
        </div>
      </div>
    </div>
  );
}
