"use client";

import React, { useState } from 'react';
import styles from './EventCard.module.css';

export interface EventData {
  id: string;
  title: string;
  date: string;
  day: string;
  month: string;
  location: string;
  category: 'Concert' | 'Cinéma' | 'Solidarité' | 'Festival' | 'Spectacle' | 'Sport';
  imageUrl: string;
  price: string;
  priceValue: number; // numeric value for checkout calculations
  capacity?: number;
  sold?: number;
  organizer?: string;
}

interface EventCardProps {
  event: EventData;
  onBuy: (event: EventData) => void;
}

export function EventCard({ event, onBuy }: EventCardProps) {
  const [isInterested, setIsInterested] = useState(false);
  const [interestCount, setInterestCount] = useState(Math.floor(Math.random() * 80) + 12);
  const [showShareAlert, setShowShareAlert] = useState(false);

  const handleInterestedToggle = () => {
    if (isInterested) {
      setIsInterested(false);
      setInterestCount(prev => prev - 1);
    } else {
      setIsInterested(true);
      setInterestCount(prev => prev + 1);
    }
  };

  const handleShare = () => {
    setShowShareAlert(true);
    setTimeout(() => setShowShareAlert(false), 2000);
    // Simple Web Share API fallback if supported
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Découvre l'événement "${event.title}" sur ASPROS!`,
        url: window.location.href,
      }).catch(err => console.log(err));
    }
  };

  // Calculate percentage for progress bar
  const percent = event.capacity && event.sold ? Math.round((event.sold / event.capacity) * 100) : 0;

  return (
    <div className={`glass ${styles.card} animate-fade-in`}>
      <div className={styles.imageContainer}>
        {/* Placeholder gradient for image, or an actual img tag if available */}
        <div 
          className={styles.image} 
          style={event.imageUrl ? { backgroundImage: `url(${event.imageUrl})` } : {}}
        />
        
        {/* Category Badge */}
        <div className={styles.categoryBadge}>{event.category}</div>

        {/* Facebook-style Calendar Badge */}
        <div className={styles.calendarBadge}>
          <span className={styles.calendarMonth}>{event.month.toUpperCase()}</span>
          <span className={styles.calendarDay}>{event.day}</span>
        </div>

        {/* Floating Quick Action Row */}
        <div className={styles.floatingActions}>
          <button 
            onClick={handleInterestedToggle} 
            className={`${styles.floatBtn} ${isInterested ? styles.activeFloatBtn : ''}`}
            aria-label="Intéressé"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={isInterested ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>
          <button onClick={handleShare} className={styles.floatBtn} aria-label="Partager">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
        </div>

        {showShareAlert && (
          <div className={styles.shareAlert}>
            Lien copié dans le presse-papier !
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.metaRow}>
          <span className={styles.dateText}>{event.date}</span>
          <span className={styles.organizerText}>{event.organizer || "Par ASPROS"}</span>
        </div>
        
        <h3 className={styles.title}>{event.title}</h3>
        <p className={styles.location}>📍 {event.location}</p>

        {/* Progress Bar (Limit indicator or Solidarité donation meter) */}
        {event.capacity && event.sold && (
          <div className={styles.progressContainer}>
            <div className={styles.progressLabelRow}>
              <span>
                {event.category === 'Solidarité' ? 'Objectif Collecte' : 'Billet vendus'}
              </span>
              <span className={styles.progressPercentage}>
                {event.category === 'Solidarité' ? `${percent}%` : `${event.sold}/${event.capacity}`}
              </span>
            </div>
            <div className={styles.progressBarBg}>
              <div 
                className={styles.progressBarFill} 
                style={{ 
                  width: `${percent}%`, 
                  background: event.category === 'Solidarité' ? 'linear-gradient(90deg, #10b981, #34d399)' : 'linear-gradient(90deg, var(--primary-blue), var(--electric-blue))'
                }}
              />
            </div>
          </div>
        )}

        <div className={styles.reactionText}>
          {interestCount} personnes intéressées
        </div>

        <div className={styles.footer}>
          <span className={styles.price}>{event.price}</span>
          <button onClick={() => onBuy(event)} className="btn-primary" style={{ padding: '10px 18px', fontSize: '0.85rem' }}>
            {event.category === 'Solidarité' ? 'Faire un don' : 'Billeterie'}
          </button>
        </div>
      </div>
    </div>
  );
}

