"use client";

import React, { useState } from 'react';
import { EventCard, EventData } from '@/components/EventCard';
import styles from './page.module.css';

const MOCK_EVENTS: EventData[] = [
  {
    id: '1',
    title: 'Festival Afrobeat 2026',
    date: 'Mercredi 15 Juillet • 18:00',
    day: '15',
    month: 'Juil',
    location: 'Stade de l\'Amitié, Cotonou',
    category: 'Festival',
    imageUrl: '', // fallback to gradient
    price: '15 000 FCFA',
    priceValue: 15000,
    capacity: 5000,
    sold: 4120,
    organizer: 'ASPROS Entertainment'
  },
  {
    id: '2',
    title: 'Fally Ipupa Live à Abidjan',
    date: 'Samedi 08 Août • 20:00',
    day: '08',
    month: 'Août',
    location: 'Ivoire Golf Club, Abidjan',
    category: 'Concert',
    imageUrl: '',
    price: '25 000 FCFA',
    priceValue: 25000,
    capacity: 2000,
    sold: 1750,
    organizer: 'Trace Events'
  },
  {
    id: '3',
    title: 'Avant-première : Black Panther 3',
    date: 'Jeudi 20 Août • 20:30',
    day: '20',
    month: 'Août',
    location: 'Canal Olympia, Douala',
    category: 'Cinéma',
    imageUrl: '',
    price: '5 000 FCFA',
    priceValue: 5000,
    capacity: 450,
    sold: 380,
    organizer: 'Canal+ Afrique'
  },
  {
    id: '4',
    title: 'Gala de Charité - Orphelins d\'Afrique',
    date: 'Dimanche 05 Septembre • 19:00',
    day: '05',
    month: 'Sept',
    location: 'Hôtel Azalaï, Lomé',
    category: 'Solidarité',
    imageUrl: '',
    price: 'Don Libre',
    priceValue: 0,
    capacity: 5000000, // objective amount (5M FCFA)
    sold: 3850000, // raised amount (3.85M FCFA)
    organizer: 'Association Main Solidaire'
  },
  {
    id: '5',
    title: 'Masterclass : Tech in Africa 2026',
    date: 'Mardi 10 Octobre • 09:00',
    day: '10',
    month: 'Oct',
    location: 'Palais des Congrès, Dakar',
    category: 'Spectacle',
    imageUrl: '',
    price: '10 000 FCFA',
    priceValue: 10000,
    capacity: 300,
    sold: 140,
    organizer: 'African Tech Hub'
  }
];

const SPOTLIGHT_EVENTS = [MOCK_EVENTS[0], MOCK_EVENTS[1], MOCK_EVENTS[3]];

type CategoryFilter = 'Tous' | 'Concerts' | 'Cinéma' | 'Solidarité' | 'Festivals';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Checkout Sheet States
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [donationAmount, setDonationAmount] = useState(5000);
  const [selectedPayment, setSelectedPayment] = useState<'wave' | 'orange' | 'mtn' | 'card'>('wave');
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'loading' | 'success'>('details');

  // Filter events based on active category and search query
  const filteredEvents = MOCK_EVENTS.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeCategory === 'Tous') return matchesSearch;
    if (activeCategory === 'Concerts') return event.category === 'Concert' && matchesSearch;
    if (activeCategory === 'Cinéma') return event.category === 'Cinéma' && matchesSearch;
    if (activeCategory === 'Solidarité') return event.category === 'Solidarité' && matchesSearch;
    if (activeCategory === 'Festivals') return event.category === 'Festival' && matchesSearch;
    return matchesSearch;
  });

  const handleOpenCheckout = (event: EventData) => {
    setSelectedEvent(event);
    setTicketCount(1);
    setDonationAmount(5000);
    setCheckoutStep('details');
  };

  const handleCloseCheckout = () => {
    setSelectedEvent(null);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('loading');

    // Simulate API Payment call
    setTimeout(() => {
      setCheckoutStep('success');
      
      // Store ticket in localStorage to view in the Tickets page
      if (selectedEvent) {
        const currentTickets = JSON.parse(localStorage.getItem('aspros_tickets') || '[]');
        const newTicket = {
          ticketId: `ASP-${Math.floor(Math.random() * 900000) + 100000}`,
          eventId: selectedEvent.id,
          eventTitle: selectedEvent.title,
          eventDate: selectedEvent.date,
          eventLocation: selectedEvent.location,
          eventCategory: selectedEvent.category,
          quantity: selectedEvent.category === 'Solidarité' ? 1 : ticketCount,
          pricePaid: selectedEvent.category === 'Solidarité' ? `${donationAmount.toLocaleString('fr-FR')} FCFA` : `${(selectedEvent.priceValue * ticketCount).toLocaleString('fr-FR')} FCFA`,
          qrCodeValue: `ASPROS_TICKET_${selectedEvent.id}_${Date.now()}`,
          purchaseDate: new Date().toLocaleDateString('fr-FR')
        };
        localStorage.setItem('aspros_tickets', JSON.stringify([newTicket, ...currentTickets]));
      }
    }, 2000);
  };

  return (
    <div className={styles.container}>
      {/* Dynamic Main Page Header */}
      <div style={{ marginTop: '10px' }}>
        <h1 className={styles.sectionTitle} style={{ fontSize: '1.6rem', marginBottom: '4px' }}>
          Explorez ASPROS
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', paddingLeft: '4px' }}>
          Trouvez les meilleurs événements et causes solidaires
        </p>
      </div>

      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" strokeWidth="2" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" />
        </svg>
        <input 
          type="text" 
          placeholder="Rechercher un événement, lieu..." 
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Spotlight Slider (Tikerama Style) - Only visible when search is empty */}
      {searchQuery === '' && (
        <section className={styles.spotlightSection}>
          <h2 className={styles.sectionTitle}>À la une 🔥</h2>
          <div className={styles.storiesSlider}>
            {SPOTLIGHT_EVENTS.map(event => (
              <div 
                key={`spotlight-${event.id}`} 
                className={styles.storyCard}
                onClick={() => handleOpenCheckout(event)}
              >
                <div className={styles.storyImage} style={event.imageUrl ? { backgroundImage: `url(${event.imageUrl})` } : {}} />
                <div className={styles.storyOverlay}>
                  <span className={styles.storyBadge}>{event.category}</span>
                  <h3 className={styles.storyTitle}>{event.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Category Filter Horizontal Slider */}
      <div className={styles.filterSlider}>
        {(['Tous', 'Concerts', 'Cinéma', 'Solidarité', 'Festivals'] as CategoryFilter[]).map(category => (
          <button 
            key={category} 
            className={`${styles.filterBtn} ${activeCategory === category ? styles.active : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Vertical Feed Section */}
      <section className={styles.feedSection}>
        <h2 className={styles.sectionTitle}>
          {activeCategory === 'Tous' ? 'Tous les événements' : activeCategory}
        </h2>
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              onBuy={handleOpenCheckout}
            />
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 10px', color: 'var(--text-secondary)' }}>
            Aucun événement trouvé pour cette sélection.
          </div>
        )}
      </section>

      {/* Bottom Sheet Drawer for Express Ticket Purchase */}
      {selectedEvent && (
        <div className="bottom-sheet-overlay" onClick={handleCloseCheckout}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="bottom-sheet-handle" onClick={handleCloseCheckout}></div>
            
            {checkoutStep === 'details' && (
              <>
                <h3 className={styles.sheetTitle}>
                  {selectedEvent.category === 'Solidarité' ? 'Soutenir la campagne' : 'Achat Express'}
                </h3>
                <p className={styles.sheetSubtitle}>{selectedEvent.title}</p>
                
                <form onSubmit={handleCheckoutSubmit} className={styles.sheetDetails}>
                  {/* Purchase details */}
                  {selectedEvent.category === 'Solidarité' ? (
                    <div className={styles.inputGroup} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label htmlFor="donation" className={styles.counterLabel}>Montant du don (FCFA)</label>
                      <input 
                        type="number" 
                        id="donation"
                        className="form-input" 
                        min="500" 
                        step="500"
                        value={donationAmount} 
                        onChange={(e) => setDonationAmount(Number(e.target.value))}
                        required
                      />
                      <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                        {[1000, 5000, 10000, 25000].map(amt => (
                          <button 
                            key={amt} 
                            type="button" 
                            className="btn-secondary" 
                            style={{ padding: '8px 12px', fontSize: '0.8rem', flex: 1 }}
                            onClick={() => setDonationAmount(amt)}
                          >
                            {amt.toLocaleString()}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className={styles.counterRow}>
                      <span className={styles.counterLabel}>Nombre de billets</span>
                      <div className={styles.counterControls}>
                        <button 
                          type="button" 
                          className={styles.counterBtn}
                          onClick={() => setTicketCount(prev => Math.max(1, prev - 1))}
                          disabled={ticketCount <= 1}
                        >
                          -
                        </button>
                        <span className={styles.counterValue}>{ticketCount}</span>
                        <button 
                          type="button" 
                          className={styles.counterBtn}
                          onClick={() => setTicketCount(prev => prev + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Payment Mobile Money selection */}
                  <div>
                    <h4 className={styles.paymentTitle}>Moyen de paiement</h4>
                    <div className={styles.paymentGrid}>
                      <div 
                        className={`${styles.paymentMethodCard} ${selectedPayment === 'wave' ? styles.selectedPayment : ''}`}
                        onClick={() => setSelectedPayment('wave')}
                      >
                        <div className={styles.paymentMethodLogo} style={{ backgroundColor: '#2563eb' }}>W</div>
                        <span className={styles.paymentMethodName}>Wave</span>
                      </div>
                      
                      <div 
                        className={`${styles.paymentMethodCard} ${selectedPayment === 'orange' ? styles.selectedPayment : ''}`}
                        onClick={() => setSelectedPayment('orange')}
                      >
                        <div className={styles.paymentMethodLogo} style={{ backgroundColor: '#ff6600' }}>O</div>
                        <span className={styles.paymentMethodName}>Orange</span>
                      </div>

                      <div 
                        className={`${styles.paymentMethodCard} ${selectedPayment === 'mtn' ? styles.selectedPayment : ''}`}
                        onClick={() => setSelectedPayment('mtn')}
                      >
                        <div className={styles.paymentMethodLogo} style={{ backgroundColor: '#ffcc00', color: 'black' }}>M</div>
                        <span className={styles.paymentMethodName}>MTN</span>
                      </div>

                      <div 
                        className={`${styles.paymentMethodCard} ${selectedPayment === 'card' ? styles.selectedPayment : ''}`}
                        onClick={() => setSelectedPayment('card')}
                      >
                        <div className={styles.paymentMethodLogo} style={{ backgroundColor: '#475569' }}>💳</div>
                        <span className={styles.paymentMethodName}>Carte</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing recap */}
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Total</span>
                    <span className={styles.summaryValue}>
                      {selectedEvent.category === 'Solidarité' 
                        ? `${donationAmount.toLocaleString('fr-FR')} FCFA`
                        : `${(selectedEvent.priceValue * ticketCount).toLocaleString('fr-FR')} FCFA`
                      }
                    </span>
                  </div>

                  <button type="submit" className={`btn-primary ${styles.checkoutBtn}`}>
                    Confirmer le paiement
                  </button>
                </form>
              </>
            )}

            {checkoutStep === 'loading' && (
              <div className={styles.successContainer}>
                <div className={styles.successIconWrapper} style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary-blue)' }}>
                  <span className={styles.loadingSpinner}></span>
                </div>
                <h3 className={styles.successTitle}>Traitement en cours...</h3>
                <p className={styles.successMessage}>
                  Veuillez valider la transaction sur votre téléphone.<br />
                  En attente du signal de votre opérateur Mobile Money.
                </p>
              </div>
            )}

            {checkoutStep === 'success' && (
              <div className={styles.successContainer}>
                <div className={styles.successIconWrapper}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className={styles.successTitle}>Paiement Réussi !</h3>
                <p className={styles.successMessage}>
                  Votre paiement a été validé avec succès.<br />
                  Retrouvez vos e-tickets dans votre portefeuille de billets.
                </p>
                <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                  <button 
                    onClick={handleCloseCheckout} 
                    className="btn-secondary" 
                    style={{ flex: 1, height: '48px' }}
                  >
                    Fermer
                  </button>
                  <button 
                    onClick={() => window.location.href = '/tickets'} 
                    className="btn-primary" 
                    style={{ flex: 1, height: '48px' }}
                  >
                    Voir mon Billet
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

