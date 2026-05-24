import React, { useState, useEffect } from 'react';
import './App.css';

const Icons = {
  Home: ({ active }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V10.5Z"
        fill={active ? "#6c5ce7" : "none"}
        stroke={active ? "#6c5ce7" : "#aaa"}
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Profile: ({ active }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="4"
        fill={active ? "#6c5ce7" : "none"}
        stroke={active ? "#6c5ce7" : "#aaa"}
        strokeWidth="1.8"/>
      <path d="M4 20C4 17 7.58 14 12 14C16.42 14 20 17 20 20"
        stroke={active ? "#6c5ce7" : "#aaa"}
        strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  Music: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M9 18V5l12-2v13" stroke="#6c5ce7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="6" cy="18" r="3" stroke="#6c5ce7" strokeWidth="1.8"/>
      <circle cx="18" cy="16" r="3" stroke="#6c5ce7" strokeWidth="1.8"/>
    </svg>
  ),
  Calendar: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="3" stroke="#888" strokeWidth="1.6"/>
      <path d="M3 9H21" stroke="#888" strokeWidth="1.6"/>
      <path d="M8 2V6M16 2V6" stroke="#888" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  Clock: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#888" strokeWidth="1.6"/>
      <path d="M12 7V12L15 15" stroke="#888" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  Pin: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8.69 2 6 4.69 6 8C6 12.5 12 22 12 22C12 22 18 12.5 18 8C18 4.69 15.31 2 12 2Z" stroke="#888" strokeWidth="1.6"/>
      <circle cx="12" cy="8" r="2.5" stroke="#888" strokeWidth="1.6"/>
    </svg>
  ),
  Ticket: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M2 9C2 8.45 2.45 8 3 8H4C4 6.9 4.9 6 6 6H18C19.1 6 20 6.9 20 8H21C21.55 8 22 8.45 22 9V10C22 11.1 21.1 12 20 12C21.1 12 22 12.9 22 14V15C22 15.55 21.55 16 21 16H20C20 17.1 19.1 18 18 18H6C4.9 18 4 17.1 4 16H3C2.45 16 2 15.55 2 15V14C2 12.9 2.9 12 2 12C0.9 12 2 11.1 2 10V9Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M9 6V18M15 6V18" stroke="white" strokeWidth="1.4" strokeDasharray="2 2"/>
    </svg>
  ),
  Heart: ({ active }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 21C12 21 3 14.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 13 5.08C14.09 3.81 15.76 3 17.5 3C20.58 3 23 5.42 23 8.5C23 14.5 12 21 12 21Z"
        fill={active ? "#ef4444" : "none"}
        stroke={active ? "#ef4444" : "#555"}
        strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  Share: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="18" cy="5" r="3" stroke="#555" strokeWidth="1.6"/>
      <circle cx="6" cy="12" r="3" stroke="#555" strokeWidth="1.6"/>
      <circle cx="18" cy="19" r="3" stroke="#555" strokeWidth="1.6"/>
      <path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49" stroke="#555" strokeWidth="1.6"/>
    </svg>
  ),
  User: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke="rgba(255,255,255,0.8)" strokeWidth="1.6"/>
      <path d="M4 20C4 17 7.58 14 12 14C16.42 14 20 17 20 20" stroke="rgba(255,255,255,0.8)" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  TicketEmpty: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
      <path d="M2 9C2 8.45 2.45 8 3 8H4C4 6.9 4.9 6 6 6H18C19.1 6 20 6.9 20 8H21C21.55 8 22 8.45 22 9V10C22 11.1 21.1 12 20 12C21.1 12 22 12.9 22 14V15C22 15.55 21.55 16 21 16H20C20 17.1 19.1 18 18 18H6C4.9 18 4 17.1 4 16H3C2.45 16 2 15.55 2 15V14C2 12.9 2.9 12 2 12C0.9 12 2 11.1 2 10V9Z" stroke="#ccc" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  ),
  CalendarBadge: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="3" stroke="#6c5ce7" strokeWidth="1.6"/>
      <path d="M3 9H21" stroke="#6c5ce7" strokeWidth="1.6"/>
      <path d="M8 2V6M16 2V6" stroke="#6c5ce7" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
};

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const events = [
    {
      id: 1,
      title: "NAZA EN CONCERT LIVE",
      artist: "NAZA",
      date: "13 juin 2026",
      time: "14H",
      location: "Abidjan, Côte d'Ivoire",
      price: "À partir de 10 000 F CFA",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop",
      tickets: 344,
      prices: ["16.000 XOF", "28.000 XOF", "50.000 XOF", "100.000 XOF"]
    },
    {
      id: 2,
      title: "FESTIVAL INTERNATIONAL",
      artist: "MULTI ARTISTES",
      date: "25 juillet 2026",
      time: "18H",
      location: "Dakar, Sénégal",
      price: "À partir de 15 000 F CFA",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop",
      tickets: 512,
      prices: ["15.000 XOF", "30.000 XOF", "55.000 XOF"]
    },
    {
      id: 3,
      title: "JAZZ NIGHT",
      artist: "AFRICAN JAZZ BAND",
      date: "05 septembre 2026",
      time: "20H",
      location: "Bamako, Mali",
      price: "À partir de 8 000 F CFA",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop",
      tickets: 189,
      prices: ["8.000 XOF", "18.000 XOF", "35.000 XOF"]
    },
    {
      id: 4,
      title: "RAP FESTIVAL",
      artist: "VARIOUS ARTISTS",
      date: "15 octobre 2026",
      time: "19H",
      location: "Douala, Cameroun",
      price: "À partir de 12 000 F CFA",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
      tickets: 421,
      prices: ["12.000 XOF", "25.000 XOF", "45.000 XOF", "80.000 XOF"]
    },
    {
      id: 5,
      title: "ELECTRO BEACH",
      artist: "DJ MIX",
      date: "20 décembre 2026",
      time: "22H",
      location: "Grand-Bassam, Côte d'Ivoire",
      price: "À partir de 20 000 F CFA",
      image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&h=400&fit=crop",
      tickets: 678,
      prices: ["20.000 XOF", "40.000 XOF", "75.000 XOF", "150.000 XOF"]
    }
  ];

  const EventCard = ({ event }) => {
    const [liked, setLiked] = useState(false);
    return (
      <div className="event-card">
        <div className="event-image-container">
          <img src={event.image} alt={event.title} className="event-image" />
          <div className="event-actions">
            <button className={`action-btn like-btn ${liked ? 'active' : ''}`} onClick={() => setLiked(!liked)}>
              <Icons.Heart active={liked} />
            </button>
            <button className="action-btn share-btn">
              <Icons.Share />
            </button>
          </div>
          <div className="event-badge">
            <Icons.Music /> Concert
          </div>
        </div>

        <div className="event-content">
          <div className="event-header">
            <div>
              <h2 className="event-artist">{event.artist}</h2>
              <p className="event-title">{event.title}</p>
            </div>
            <div className="ticket-count">{event.tickets} tickets</div>
          </div>

          <div className="event-details">
            <div className="event-info">
              <div className="info-item">
                <span className="info-icon"><Icons.Calendar /></span>
                <span>{event.date}</span>
              </div>
              <div className="info-item">
                <span className="info-icon"><Icons.Clock /></span>
                <span>{event.time}</span>
              </div>
              <div className="info-item">
                <span className="info-icon"><Icons.Pin /></span>
                <span>{event.location}</span>
              </div>
            </div>
          </div>

          <div className="event-pricing">
            <p className="price-main">{event.price}</p>
            <div className="price-tags">
              {event.prices.map((price, idx) => (
                <span key={idx} className="price-tag">{price}</span>
              ))}
            </div>
          </div>

          <button className="buy-btn">
            <Icons.Ticket /> Acheter tickets
          </button>

          <div className="event-footer">
            <div className="publisher">
              <div className="publisher-avatar">U</div>
              <span>Publié par ULTRACOM GROUP</span>
            </div>
            <button className="subscribe-btn">S'abonner</button>
          </div>
        </div>
      </div>
    );
  };

  const ProfileScreen = () => (
    <div className="profile-screen">
      <div className="profile-header">
        <div className="profile-avatar">
          <span className="avatar-icon"><Icons.User /></span>
        </div>
        <h2 className="profile-name">Utilisateur</h2>
        <p className="profile-email">utilisateur@email.com</p>
      </div>
      <div className="profile-content">
        <div className="profile-section">
          <h3 className="section-title">Mes informations</h3>
          <div className="info-list">
            <div className="info-row">
              <span className="info-label">Nom complet</span>
              <span className="info-value">Jean Kouadio</span>
            </div>
            <div className="info-row">
              <span className="info-label">Téléphone</span>
              <span className="info-value">+226 XX XX XX XX</span>
            </div>
            <div className="info-row">
              <span className="info-label">Ville</span>
              <span className="info-value">Ouagadougou, Burkina Faso</span>
            </div>
          </div>
        </div>
        <div className="profile-section">
          <h3 className="section-title">Mes billets</h3>
          <div className="empty-tickets">
            <span className="empty-icon"><Icons.TicketEmpty /></span>
            <p>Aucun billet pour le moment</p>
          </div>
        </div>
      </div>
    </div>
  );

  const DesktopNav = () => (
    <div className="desktop-nav">
      <div className="nav-logo">
        <span className="logo-icon"><Icons.Music /></span>
        <span className="logo-text">EventHub</span>
      </div>
      <div className="nav-menu">
        <button
          className={`nav-item-desktop ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <span className="nav-icon"><Icons.Home active={activeTab === 'home'} /></span>
          <span className="nav-label">Accueil</span>
        </button>
        <button
          className={`nav-item-desktop ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <span className="nav-icon"><Icons.Profile active={activeTab === 'profile'} /></span>
          <span className="nav-label">Profil</span>
        </button>
      </div>
      <div className="nav-footer">
        <div className="user-info">
          <div className="user-avatar">J</div>
          <div className="user-details">
            <span className="user-name">Jean K.</span>
            <span className="user-status">Connecté</span>
          </div>
        </div>
      </div>
    </div>
  );

  const MobileNav = () => (
    <div className="mobile-nav">
      <div className="nav-container">
        <button
          className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <span className="nav-icon"><Icons.Home active={activeTab === 'home'} /></span>
          <span className="nav-label">Accueil</span>
        </button>
        <button
          className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <span className="nav-icon"><Icons.Profile active={activeTab === 'profile'} /></span>
          <span className="nav-label">Profil</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className={`app ${isMobile ? 'mobile' : 'desktop'}`}>
      <div className={`header header-${activeTab}`}>
        <div className="header-content">
          <div>
            <h1 className="header-title">
              {activeTab === 'home' ? (
                <><Icons.Music /> Événements</>
              ) : (
                <><Icons.Profile active={true} /> Mon Profil</>
              )}
            </h1>
            <p className="header-subtitle">
              {activeTab === 'home' ? 'Découvrez les concerts à venir' : 'Gérez votre compte'}
            </p>
          </div>
          {activeTab === 'home' && (
            <div className="header-badge">
              <Icons.CalendarBadge /> 2026 • {events.length} événements
            </div>
          )}
        </div>
      </div>

      <div className="app-layout">
        {!isMobile && <DesktopNav />}
        <div className="main-content">
          {activeTab === 'home' ? (
            <div className="events-grid">
              {events.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <ProfileScreen />
          )}
        </div>
      </div>

      {isMobile && <MobileNav />}
    </div>
  );
};

export default App;