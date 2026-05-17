import React from 'react';
import styles from './EventCard.module.css';

export interface EventData {
  id: string;
  title: string;
  date: string;
  location: string;
  category: 'Concert' | 'Cinéma' | 'Solidarité' | 'Sport';
  imageUrl: string;
  price: string;
}

export function EventCard({ event }: { event: EventData }) {
  return (
    <div className={`glass glow ${styles.card}`}>
      <div className={styles.imageContainer}>
        {/* Placeholder gradient for image, or an actual img tag if available */}
        <div 
          className={styles.image} 
          style={event.imageUrl ? { backgroundImage: `url(${event.imageUrl})` } : {}}
        />
        <div className={styles.categoryBadge}>{event.category}</div>
      </div>
      <div className={styles.content}>
        <div className={styles.date}>{event.date}</div>
        <h3 className={styles.title}>{event.title}</h3>
        <p className={styles.location}>📍 {event.location}</p>
        <div className={styles.footer}>
          <span className={styles.price}>{event.price}</span>
          <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
            Billets
          </button>
        </div>
      </div>
    </div>
  );
}
