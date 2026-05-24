"use client";

import React, { useState, useEffect } from 'react';
import styles from './dashboard.module.css';

interface PromoterEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  status: 'Publié' | 'Brouillon';
  sold: string;
  price: string;
}

export default function DashboardPage() {
  const [events, setEvents] = useState<PromoterEvent[]>([
    {
      id: '1',
      title: 'Festival Afrobeat 2026',
      date: '15 Juil 2026',
      location: 'Stade de l\'Amitié, Cotonou',
      status: 'Publié',
      sold: '4120 / 5000',
      price: '15 000 FCFA'
    },
    {
      id: '3',
      title: 'Gala de Charité - Enfants Orphelins',
      date: '05 Sep 2026',
      location: 'Hôtel Azalaï, Lomé',
      status: 'Publié',
      sold: '77%',
      price: 'Don Libre'
    },
    {
      id: '5',
      title: 'Masterclass : Tech in Africa 2026',
      date: '10 Oct 2026',
      location: 'Palais des Congrès, Dakar',
      status: 'Brouillon',
      sold: '0 / 300',
      price: '10 000 FCFA'
    }
  ]);

  // Scanner Simulator States
  const [showScanner, setShowScanner] = useState(false);
  const [scanResult, setScanResult] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const [scannedTicketId, setScannedTicketId] = useState('');

  // Event Creation Form States
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCapacity, setNewCapacity] = useState('1000');

  const handleStartScan = () => {
    setShowScanner(true);
    setScanResult('scanning');
    
    // Simulate scan duration
    setTimeout(() => {
      // Pick a random ticket code to validate
      const isSuccessful = Math.random() > 0.15;
      if (isSuccessful) {
        setScanResult('success');
        setScannedTicketId(`ASP-${Math.floor(Math.random() * 900000) + 100000}`);
      } else {
        setScanResult('error');
      }
    }, 2500);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: PromoterEvent = {
      id: `evt-${Date.now()}`,
      title: newTitle,
      date: newDate,
      location: newLocation,
      status: 'Brouillon',
      sold: `0 / ${newCapacity}`,
      price: `${newPrice} FCFA`
    };

    setEvents([newEvent, ...events]);
    setShowCreateForm(false);
    
    // Reset Form
    setNewTitle('');
    setNewDate('');
    setNewLocation('');
    setNewPrice('');
  };

  return (
    <div className={styles.container}>
      {/* Mobile Header Dashboard */}
      <div className={styles.headerRow}>
        <div>
          <span className={styles.labelPrefix}>ESPACE ORGANISATEUR</span>
          <h1 className={styles.title}>Dashboard</h1>
        </div>
        <button 
          onClick={() => setShowCreateForm(true)} 
          className="btn-primary" 
          style={{ padding: '10px 14px', fontSize: '0.85rem' }}
        >
          + Événement
        </button>
      </div>

      {/* Stats row layout */}
      <div className={styles.statsScroll}>
        <div className={`glass ${styles.statCard}`}>
          <span className={styles.statIcon}>🎟️</span>
          <span className={styles.statLabel}>Tickets vendus</span>
          <h3 className={styles.statValue}>5,870</h3>
          <span className={styles.trendUp}>+12.4%</span>
        </div>

        <div className={`glass ${styles.statCard}`}>
          <span className={styles.statIcon}>💰</span>
          <span className={styles.statLabel}>Revenus</span>
          <h3 className={styles.statValue}>24.8M <span style={{ fontSize: '0.75rem' }}>FCFA</span></h3>
          <span className={styles.trendUp}>+8.5%</span>
        </div>

        <div className={`glass ${styles.statCard}`}>
          <span className={styles.statIcon}>📱</span>
          <span className={styles.statLabel}>Scans Entrées</span>
          <h3 className={styles.statValue}>1,452</h3>
          <span className={styles.activePulse}>En direct</span>
        </div>
      </div>

      {/* Scan Access CTA card */}
      <div className={`glass ${styles.scanCtaCard}`}>
        <div className={styles.scanCtaInfo}>
          <h4>Contrôle d'accès le jour J</h4>
          <p>Scannez et validez les billets de vos participants à l'entrée.</p>
        </div>
        <button onClick={handleStartScan} className="btn-primary">
          📲 Scanner
        </button>
      </div>

      {/* Events List for Mobile */}
      <section className={styles.eventsSection}>
        <h2 className={styles.sectionTitle}>Mes événements ({events.length})</h2>
        <div className={styles.eventsList}>
          {events.map((event) => (
            <div key={event.id} className={`glass ${styles.eventCardItem}`}>
              <div className={styles.cardHeader}>
                <span className={`${styles.statusBadge} ${event.status === 'Publié' ? styles.statusActive : styles.statusDraft}`}>
                  {event.status}
                </span>
                <span className={styles.cardPrice}>{event.price}</span>
              </div>
              <h3 className={styles.cardTitle}>{event.title}</h3>
              <p className={styles.cardDetail}>📅 {event.date}</p>
              <p className={styles.cardDetail}>📍 {event.location.split(',')[0]}</p>
              <div className={styles.cardFooter}>
                <span>Ventes : <strong>{event.sold}</strong></span>
                <button className={styles.editBtn}>Modifier</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QR Code Scanner Overlay Simulator */}
      {showScanner && (
        <div className="bottom-sheet-overlay" onClick={() => setShowScanner(false)}>
          <div className={`bottom-sheet ${styles.scannerSheet}`} onClick={(e) => e.stopPropagation()}>
            <div className="bottom-sheet-handle" onClick={() => setShowScanner(false)}></div>
            
            <div className={styles.scannerContent}>
              <h3 className={styles.scannerTitle}>Validation des Billets</h3>
              
              {scanResult === 'scanning' && (
                <>
                  <p className={styles.scannerSubtitle}>Visez le QR Code du billet avec votre caméra.</p>
                  
                  {/* Camera screen simulation */}
                  <div className={styles.cameraBox}>
                    {/* Viewfinder frame corners */}
                    <div className={`${styles.corner} ${styles.topLeft}`}></div>
                    <div className={`${styles.corner} ${styles.topRight}`}></div>
                    <div className={`${styles.corner} ${styles.bottomLeft}`}></div>
                    <div className={`${styles.corner} ${styles.bottomRight}`}></div>
                    
                    <div className={styles.laserBar}></div>
                    
                    <div className={styles.mockScanningText}>Recherche de QR Code...</div>
                  </div>
                  
                  <button onClick={() => setShowScanner(false)} className="btn-secondary" style={{ width: '100%' }}>
                    Annuler
                  </button>
                </>
              )}

              {scanResult === 'success' && (
                <div className={styles.resultContainer}>
                  <div className={`${styles.resultIconWrapper} ${styles.resultSuccess}`}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h4 className={styles.resultTitle}>Billet Valide !</h4>
                  <p className={styles.resultDetail}>
                    ID: <strong>{scannedTicketId}</strong><br />
                    Événement: <strong>Festival Afrobeat 2026</strong><br />
                    Accès: <strong>Standard - Entrée 1</strong>
                  </p>
                  
                  <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                    <button onClick={() => setShowScanner(false)} className="btn-secondary" style={{ flex: 1 }}>
                      Fermer
                    </button>
                    <button onClick={handleStartScan} className="btn-primary" style={{ flex: 1 }}>
                      Suivant
                    </button>
                  </div>
                </div>
              )}

              {scanResult === 'error' && (
                <div className={styles.resultContainer}>
                  <div className={`${styles.resultIconWrapper} ${styles.resultError}`}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                  <h4 className={styles.resultTitle} style={{ color: '#ef4444' }}>Billet Invalide !</h4>
                  <p className={styles.resultDetail}>
                    Ce billet a déjà été scanné ou n'est pas reconnu par le système.<br />
                    <span style={{ color: '#ef4444', fontWeight: 600 }}>Erreur : Code QR dupliqué.</span>
                  </p>
                  
                  <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                    <button onClick={() => setShowScanner(false)} className="btn-secondary" style={{ flex: 1 }}>
                      Fermer
                    </button>
                    <button onClick={handleStartScan} className="btn-primary" style={{ flex: 1, backgroundColor: '#ef4444' }}>
                      Réessayer
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Event Drawer Form */}
      {showCreateForm && (
        <div className="bottom-sheet-overlay" onClick={() => setShowCreateForm(false)}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="bottom-sheet-handle" onClick={() => setShowCreateForm(false)}></div>
            
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>Nouveau Événement</h3>
            
            <form onSubmit={handleCreateEvent} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className={styles.inputGroup}>
                <label className={styles.formLabel}>Nom de l'événement</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Ex: Soirée Acoustique VIP"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required 
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.formLabel}>Date & Heure</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Ex: Vendredi 12 Décembre • 20:00"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  required 
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.formLabel}>Lieu</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Ex: Hôtel Sofitel, Abidjan"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  required 
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div className={styles.inputGroup} style={{ flex: 1 }}>
                  <label className={styles.formLabel}>Tarif (FCFA)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="10000"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    required 
                  />
                </div>
                <div className={styles.inputGroup} style={{ flex: 1 }}>
                  <label className={styles.formLabel}>Capacité</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={newCapacity}
                    onChange={(e) => setNewCapacity(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowCreateForm(false)} className="btn-secondary" style={{ flex: 1 }}>
                  Annuler
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                  Créer Brouillon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

