import React, { useState, useEffect } from 'react';
import './App.css';

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const IcTicket = ({ size = 20, color = 'white' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M2 9.5C2 8.95 2.45 8.5 3 8.5H4C4 7.4 4.9 6.5 6 6.5H18C19.1 6.5 20 7.4 20 8.5H21C21.55 8.5 22 8.95 22 9.5V10.5C22 11.33 21.33 12 20.5 12C21.33 12 22 12.67 22 13.5V14.5C22 15.05 21.55 15.5 21 15.5H20C20 16.6 19.1 17.5 18 17.5H6C4.9 17.5 4 16.6 4 15.5H3C2.45 15.5 2 15.05 2 14.5V13.5C2 12.67 1.33 12 2 12C1.33 12 2 11.33 2 10.5V9.5Z"
      fill={color} opacity="0.92"
    />
    <line x1="9" y1="6.5" x2="9" y2="17.5" stroke="#1a6cf0" strokeWidth="1.5" strokeDasharray="2 2"/>
    <line x1="15" y1="6.5" x2="15" y2="17.5" stroke="#1a6cf0" strokeWidth="1.5" strokeDasharray="2 2"/>
  </svg>
);

const IcHeart = ({ active }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 21C12 21 3 14.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 13 5.08C14.09 3.81 15.76 3 17.5 3C20.58 3 23 5.42 23 8.5C23 14.5 12 21 12 21Z"
      fill={active ? '#ef4444' : 'none'}
      stroke={active ? '#ef4444' : '#aaa'}
      strokeWidth="1.7"
    />
  </svg>
);

const IcCheck = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <path d="M5 12L10 17L19 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IcSearch = ({ color = '#1a6cf0' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2"/>
    <path d="M16.5 16.5L21 21" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IcFilter = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M3 6h18M7 12h10M11 18h2" stroke="#aaa" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IcPin = ({ color = '#1a6cf0' }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C8.69 2 6 4.69 6 8C6 12.5 12 22 12 22C12 22 18 12.5 18 8C18 4.69 15.31 2 12 2Z" stroke={color} strokeWidth="1.8"/>
    <circle cx="12" cy="8" r="2.5" stroke={color} strokeWidth="1.8"/>
  </svg>
);

const IcChevronDown = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <path d="M6 9L12 15L18 9" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IcUsers = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="7" r="3.5" stroke="#555" strokeWidth="1.6"/>
    <path d="M2 20C2 17 5.13 14 9 14C12.87 14 16 17 16 20" stroke="#555" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M17 11C18.66 11 20 9.66 20 8C20 6.34 18.66 5 17 5M22 20C22 17.5 20.5 15.5 18 14.5" stroke="#555" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const IcBell = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M18 8C18 4.69 15.31 2 12 2C8.69 2 6 4.69 6 8C6 14 3 16 3 16H21C21 16 18 14 18 8Z" stroke="#555" strokeWidth="1.6"/>
    <path d="M10 20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20" stroke="#555" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const IcMenu = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M3 6h18M3 12h18M3 18h18" stroke="#555" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const IcUser = ({ size = 22, color = '#555' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.6"/>
    <circle cx="12" cy="9" r="3" stroke={color} strokeWidth="1.6"/>
    <path d="M5.5 20C5.5 17 8.46 15 12 15C15.54 15 18.5 17 18.5 20" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const IcHome = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V10.5Z"
      fill={active ? '#1a6cf0' : 'none'}
      stroke={active ? '#1a6cf0' : '#aaa'}
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

const IcCalendar = ({ color = '#888' }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="3" stroke={color} strokeWidth="1.6"/>
    <path d="M3 9H21" stroke={color} strokeWidth="1.6"/>
    <path d="M8 2V6M16 2V6" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const IcClock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#888" strokeWidth="1.6"/>
    <path d="M12 7V12L15 15" stroke="#888" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const IcShare = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="18" cy="5" r="3" stroke="#555" strokeWidth="1.6"/>
    <circle cx="6" cy="12" r="3" stroke="#555" strokeWidth="1.6"/>
    <circle cx="18" cy="19" r="3" stroke="#555" strokeWidth="1.6"/>
    <path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49" stroke="#555" strokeWidth="1.6"/>
  </svg>
);

// Icônes de catégories — SVG propres comme Tikerama
const IcGrid = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
    <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
    <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
    <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
  </svg>
);

const IcMusic = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.8"/>
  </svg>
);

const IcPalette = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C12.83 22 13.5 21.33 13.5 20.5C13.5 20.11 13.35 19.76 13.11 19.49C12.88 19.23 12.73 18.88 12.73 18.5C12.73 17.67 13.4 17 14.23 17H16C19.31 17 22 14.31 22 11C22 6.03 17.52 2 12 2Z" stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="6.5" cy="11.5" r="1.5" fill="currentColor"/>
    <circle cx="9.5" cy="7.5" r="1.5" fill="currentColor"/>
    <circle cx="14.5" cy="7.5" r="1.5" fill="currentColor"/>
    <circle cx="17.5" cy="11.5" r="1.5" fill="currentColor"/>
  </svg>
);

const IcGradCap = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M22 9L12 5L2 9L12 13L22 9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M6 11V16C6 16 8 19 12 19C16 19 18 16 18 16V11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M22 9V14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const IcCocktail = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6 3H18L13 10V19H15M9 10V19H11M9 19H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 7H7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const IcPlane = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M21 15.5L3 8.5L5 12.5L3 16.5L21 15.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M9 11.5L7.5 7L10.5 8L13 4.5L14.5 11.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IcSportBall = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M12 3C12 3 9 7 9 12C9 17 12 21 12 21" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M12 3C12 3 15 7 15 12C15 17 12 21 12 21" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M3 12H21" stroke="currentColor" strokeWidth="1.8"/>
  </svg>
);

const IcFestival = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M4 20L8 9L12 14L16 7L20 20H4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M12 5V3M7.5 6.5L6 5M16.5 6.5L18 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const IcTicketBuy = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M2 9.5C2 8.95 2.45 8.5 3 8.5H4C4 7.4 4.9 6.5 6 6.5H18C19.1 6.5 20 7.4 20 8.5H21C21.55 8.5 22 8.95 22 9.5V10.5C22 11.33 21.33 12 20.5 12C21.33 12 22 12.67 22 13.5V14.5C22 15.05 21.55 15.5 21 15.5H20C20 16.6 19.1 17.5 18 17.5H6C4.9 17.5 4 16.6 4 15.5H3C2.45 15.5 2 15.05 2 14.5V13.5C2 12.67 1.33 12 2 12C1.33 12 2 11.33 2 10.5V9.5Z"
      stroke="white" strokeWidth="1.6"
    />
    <line x1="9" y1="6.5" x2="9" y2="17.5" stroke="white" strokeWidth="1.4" strokeDasharray="2 2"/>
    <line x1="15" y1="6.5" x2="15" y2="17.5" stroke="white" strokeWidth="1.4" strokeDasharray="2 2"/>
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: 'all',       label: 'Toutes',    Icon: IcGrid },
  { id: 'concert',   label: 'Concert',   Icon: IcMusic },
  { id: 'culture',   label: 'Culture',   Icon: IcPalette },
  { id: 'formation', label: 'Formation', Icon: IcGradCap },
  { id: 'soiree',    label: 'Soirée',    Icon: IcCocktail },
  { id: 'tourisme',  label: 'Tourisme',  Icon: IcPlane },
  { id: 'sport',     label: 'Sport',     Icon: IcSportBall },
  { id: 'festival',  label: 'Festival',  Icon: IcFestival },
];

const EVENTS = [
  {
    id: 1,
    title: 'NAZA EN CONCERT LIVE',
    date: '13 juin 2026',
    time: '14H',
    location: 'Abidjan, Côte d\'Ivoire',
    price: 'À partir de 10 000 F CFA',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop',
    likes: 344,
    category: 'concert',
    catLabel: 'Concert',
    catColor: '#1a6cf0',
    verified: true,
    live: false,
    prices: ['16 000 XOF', '28 000 XOF', '50 000 XOF', '100 000 XOF'],
    publisher: 'ULTRACOM GROUP',
  },
  {
    id: 2,
    title: 'DRÔLES DE FEMMES 2026',
    date: '06 juin 2026',
    time: '19H',
    location: 'Abidjan, Côte d\'Ivoire',
    price: 'À partir de 5 000 F CFA',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop',
    likes: 83,
    category: 'festival',
    catLabel: 'Festival',
    catColor: '#16a34a',
    verified: true,
    live: false,
    prices: ['5 000 XOF', '15 000 XOF', '30 000 XOF'],
    publisher: 'THEATRE IVOIRE',
  },
  {
    id: 3,
    title: 'FÊTES DES MÈRES',
    date: 'Dim 24 mai 2026',
    time: '18H',
    location: 'Ouagadougou, Burkina Faso',
    price: 'À partir de 3 000 F CFA',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop',
    likes: 76,
    category: 'concert',
    catLabel: 'Concert',
    catColor: '#1a6cf0',
    verified: false,
    live: true,
    prices: ['3 000 XOF', '8 000 XOF'],
    publisher: 'EVENTS AFRICA',
  },
  {
    id: 4,
    title: 'HIMRA EN CONCERT — STADE EBIMPÉ',
    date: '26 déc 2026',
    time: '14H',
    location: 'Abidjan, Côte d\'Ivoire',
    price: 'À partir de 15 000 F CFA',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
    likes: 5952,
    category: 'concert',
    catLabel: 'Concert',
    catColor: '#1a6cf0',
    verified: true,
    live: false,
    prices: ['15 000 XOF', '30 000 XOF', '60 000 XOF', '120 000 XOF'],
    publisher: 'ULTRACOM GROUP',
  },
  {
    id: 5,
    title: 'JAZZ NIGHT — AFRICAN JAZZ BAND',
    date: '05 sept 2026',
    time: '20H',
    location: 'Bamako, Mali',
    price: 'À partir de 8 000 F CFA',
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&h=400&fit=crop',
    likes: 189,
    category: 'culture',
    catLabel: 'Culture',
    catColor: '#7c3aed',
    verified: true,
    live: false,
    prices: ['8 000 XOF', '18 000 XOF', '35 000 XOF'],
    publisher: 'MALI EVENTS',
  },
  {
    id: 6,
    title: 'ELECTRO BEACH — GRAND-BASSAM',
    date: '20 déc 2026',
    time: '22H',
    location: 'Grand-Bassam, Côte d\'Ivoire',
    price: 'À partir de 20 000 F CFA',
    image: 'https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=600&h=400&fit=crop',
    likes: 678,
    category: 'soiree',
    catLabel: 'Soirée',
    catColor: '#0891b2',
    verified: true,
    live: false,
    prices: ['20 000 XOF', '40 000 XOF', '75 000 XOF', '150 000 XOF'],
    publisher: 'BEACH EVENTS CI',
  },
];

// ─── Logo ──────────────────────────────────────────────────────────────────────

const Logo = () => (
  <div className="logo-mark">
    <div className="logo-icon">
      <IcTicket size={20} />
    </div>
    <span className="logo-text">
      TICKET<span className="logo-bold">ASPROS</span>
    </span>
  </div>
);

// ─── Top Bar ───────────────────────────────────────────────────────────────────

const TopBar = ({ activeNav, onNavChange }) => (
  <header className="topbar">
    <Logo />

    <div className="location-pill">
      <IcPin color="#1a6cf0" />
      <span>Côte d'Ivoire</span>
      <IcChevronDown />
    </div>

    <div className="search-bar">
      <IcFilter />
      <input type="text" placeholder="Rechercher un événement, artiste, lieu..." />
      <button className="search-btn" aria-label="Rechercher">
        <IcSearch color="white" />
      </button>
    </div>

    <button className="btn-publish">Publier un événement</button>

    <div className="topbar-icons">
      <button className="icon-btn" aria-label="Communauté"><IcUsers /></button>
      <button className="icon-btn" aria-label="Notifications"><IcBell /></button>
      <button className="icon-btn" aria-label="Menu"><IcMenu /></button>
      <button
        className={`icon-btn${activeNav === 'profile' ? ' icon-btn--active' : ''}`}
        aria-label="Mon compte"
        onClick={() => onNavChange(activeNav === 'profile' ? 'home' : 'profile')}
      >
        <IcUser color={activeNav === 'profile' ? '#1a6cf0' : '#555'} />
      </button>
    </div>
  </header>
);

// ─── Tabs ──────────────────────────────────────────────────────────────────────

const TabsBar = ({ active, onChange }) => (
  <div className="tabs-bar">
    <button
      className={`tab-btn${active === 'events' ? ' active' : ''}`}
      onClick={() => onChange('events')}
    >
      Événements
    </button>
    <button
      className={`tab-btn${active === 'cotisations' ? ' active' : ''}`}
      onClick={() => onChange('cotisations')}
    >
      Cotisations
      <span className="tab-badge">Nouveau</span>
    </button>
  </div>
);

// ─── Category chips ────────────────────────────────────────────────────────────

const CategoryChips = ({ active, onChange }) => (
  <div className="cats-row">
    {CATEGORIES.map(({ id, label, Icon }) => (
      <button
        key={id}
        className={`cat-chip${active === id ? ' active' : ''}`}
        onClick={() => onChange(id)}
      >
        <span className="cat-icon-wrap"><Icon /></span>
        <span className="cat-label">{label}</span>
      </button>
    ))}
  </div>
);

// ─── Event Card ────────────────────────────────────────────────────────────────

const EventCard = ({ event }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(event.likes);

  const toggleLike = (e) => {
    e.stopPropagation();
    setLiked(v => !v);
    setLikeCount(n => liked ? n - 1 : n + 1);
  };

  return (
    <article className="event-card">
      <div className="card-img-wrapper">
        <img src={event.image} alt={event.title} className="card-img" loading="lazy" />

        {event.live
          ? <div className="badge-live">EN COURS</div>
          : event.verified && (
            <div className="badge-verified" aria-label="Vérifié"><IcCheck /></div>
          )
        }

        <div className="badge-cat" style={{ background: event.catColor }}>
          {event.catLabel}
        </div>

        <div className="card-actions">
          <button className="card-action-btn" onClick={toggleLike} aria-label="J'aime">
            <IcHeart active={liked} />
          </button>
          <button className="card-action-btn" aria-label="Partager">
            <IcShare />
          </button>
        </div>
      </div>

      <div className="card-body">
        <h3 className="card-title">{event.title}</h3>

        <div className="card-meta">
          <div className="card-info-row">
            <IcCalendar color="#1a6cf0" />
            <span>{event.date}</span>
          </div>
          <div className="card-info-row">
            <IcClock />
            <span>{event.time}</span>
          </div>
          <div className="card-info-row">
            <IcPin color="#888" />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="card-pricing">
          <p className="price-main">{event.price}</p>
          <div className="price-tags">
            {event.prices.map((p, i) => (
              <span key={i} className="price-tag">{p}</span>
            ))}
          </div>
        </div>

        <button className="btn-buy">
          <IcTicketBuy /> Acheter tickets
        </button>

        <div className="card-footer">
          <div className="publisher">
            <div className="publisher-avatar">{event.publisher[0]}</div>
            <span className="publisher-name">{event.publisher}</span>
          </div>
          <button className="likes-btn" onClick={toggleLike}>
            <IcHeart active={liked} />
            <span>{likeCount.toLocaleString('fr-FR')}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

// ─── Profile Screen ────────────────────────────────────────────────────────────

const ProfileScreen = () => (
  <div className="profile-screen">
    <div className="profile-header">
      <div className="profile-avatar-lg">
        <IcUser size={52} color="rgba(255,255,255,0.85)" />
      </div>
      <h2 className="profile-name">Utilisateur</h2>
      <p className="profile-email">utilisateur@email.com</p>
    </div>
    <div className="profile-body">
      <div className="profile-section">
        <h3 className="section-title">Mes informations</h3>
        <div className="info-list">
          {[
            ['Nom complet', 'Jean Kouadio'],
            ['Téléphone', '+226 XX XX XX XX'],
            ['Ville', 'Ouagadougou, Burkina Faso'],
          ].map(([label, value]) => (
            <div key={label} className="info-row">
              <span className="info-label">{label}</span>
              <span className="info-value">{value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="profile-section">
        <h3 className="section-title">Mes billets</h3>
        <div className="empty-tickets">
          <IcTicketBuy />
          <p>Aucun billet pour le moment</p>
        </div>
      </div>
    </div>
  </div>
);

// ─── Mobile Bottom Nav ─────────────────────────────────────────────────────────

const MobileNav = ({ activeNav, onNavChange }) => (
  <nav className="mobile-nav" aria-label="Navigation principale">
    {[
      { id: 'home',    label: 'Accueil', Icon: ({ active }) => <IcHome active={active} /> },
      { id: 'search',  label: 'Chercher', Icon: () => <IcSearch color="#aaa" /> },
      { id: 'tickets', label: 'Billets',  Icon: () => <IcTicketBuy /> },
      { id: 'profile', label: 'Profil',   Icon: ({ active }) => <IcUser size={22} color={active ? '#1a6cf0' : '#aaa'} /> },
    ].map(({ id, label, Icon }) => (
      <button
        key={id}
        className={`mnav-btn${activeNav === id ? ' active' : ''}`}
        onClick={() => onNavChange(id)}
      >
        <Icon active={activeNav === id} />
        <span>{label}</span>
      </button>
    ))}
  </nav>
);

// ─── App ───────────────────────────────────────────────────────────────────────

const App = () => {
  const [activeNav,      setActiveNav]      = useState('home');
  const [activeSection,  setActiveSection]  = useState('events');
  const [activeCat,      setActiveCat]      = useState('all');
  const [isMobile,       setIsMobile]       = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const filteredEvents = activeCat === 'all'
    ? EVENTS
    : EVENTS.filter(e => e.category === activeCat);

  const showHome = activeNav === 'home' || activeNav === 'search' || activeNav === 'tickets';

  return (
    <div className={`app ${isMobile ? 'is-mobile' : 'is-desktop'}`}>

      {/* ── Top bar (desktop + mobile) ── */}
      <TopBar activeNav={activeNav} onNavChange={setActiveNav} />

      {/* ── Main ── */}
      <main className="main-content">
        {!showHome ? (
          <ProfileScreen />
        ) : (
          <>
            <TabsBar active={activeSection} onChange={setActiveSection} />
            <CategoryChips active={activeCat} onChange={setActiveCat} />
            <p className="results-count">
              {filteredEvents.length} événement{filteredEvents.length > 1 ? 's' : ''} trouvé{filteredEvents.length > 1 ? 's' : ''}
            </p>
            <div className="events-grid">
              {filteredEvents.map(ev => (
                <EventCard key={ev.id} event={ev} />
              ))}
            </div>
          </>
        )}
      </main>

      {/* ── Mobile bottom nav ── */}
      {isMobile && (
        <MobileNav activeNav={activeNav} onNavChange={setActiveNav} />
      )}
    </div>
  );
};

export default App;