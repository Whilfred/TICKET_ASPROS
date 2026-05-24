import React, { useState } from 'react';
import { IcCalendar, IcClock, IcPin, IcTicketBuy, IcShare, IcHeart, IcUser } from '../common/Icons';

export const EventDetailPage = ({ event, onBack }) => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [activeVideo, setActiveVideo] = useState(0);

  // Vidéos des éditions précédentes
  const previousEditions = [
    {
      id: 1,
      title: "Édition 2025 - Meilleurs moments",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      videoId: "dQw4w9WgXcQ",
      date: "25 mai 2025",
      views: "125K vues"
    },
    {
      id: 2,
      title: "Édition 2024 - Concert complet",
      thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg",
      videoId: "3JZ_D3ELwOQ",
      date: "26 mai 2024",
      views: "89K vues"
    },
    {
      id: 3,
      title: "Les coulisses - Edition 2024",
      thumbnail: "https://img.youtube.com/vi/5qap5aO4i9A/hqdefault.jpg",
      videoId: "5qap5aO4i9A",
      date: "20 mai 2024",
      views: "34K vues"
    },
    {
      id: 4,
      title: "Interview des artistes - 2023",
      thumbnail: "https://img.youtube.com/vi/2Vv-BfVoq4g/hqdefault.jpg",
      videoId: "2Vv-BfVoq4g",
      date: "28 mai 2023",
      views: "56K vues"
    }
  ];

  const ticketOptions = event.prices || [
    { name: 'Standard', price: '3 000 F CFA', benefits: 'Entrée simple' },
    { name: 'VIP', price: '8 000 F CFA', benefits: 'Accès coupe-file + boisson' },
    { name: 'VVIP', price: '15 000 F CFA', benefits: 'Carré VIP + Champagne' },
  ];

  return (
    <div className="event-detail-page">
      {/* Bouton retour */}
      <button className="back-btn" onClick={onBack}>
        ← Retour aux événements
      </button>

      {/* Hero section avec image */}
      <div className="event-detail-hero">
        <img src={event.image} alt={event.title} className="event-detail-image" />
        <div className="event-detail-overlay">
          <div className="event-detail-badge" style={{ background: event.catColor }}>
            {event.catLabel}
          </div>
          <h1 className="event-detail-title">{event.title}</h1>
          <div className="event-detail-meta">
            <span className="event-detail-date">
              <IcCalendar color="#fff" /> {event.date} | {event.time} GMT
            </span>
          </div>
        </div>
      </div>

      <div className="event-detail-container">
        <div className="event-detail-main">
          {/* Description */}
          <div className="event-detail-section">
            <h2>À propos de l'événement</h2>
            <p className="event-description">
              {event.fullDescription || `CONCERT LIVE – CÉLÉBRATION 🎶 
              4 Divas • 1 Scène • Une soirée inoubliable ! 
              Abidjan s’apprête à vibrer au rythme d’un événement exceptionnel : 
              Concert Live Célébration, une soirée 100% émotion, nostalgie et belles mélodies 💕💖
              
              Venez célébrer la fête des mères dans une ambiance chaleureuse et festive. 
              Les plus grandes voix de la musique ivoirienne se réunissent pour vous offrir 
              un spectacle unique. Au programme : des surprises, des invités spéciaux et 
              beaucoup d'émotions !`}
            </p>
            <button className="read-more-btn">Lire moins</button>
          </div>

          {/* Informations pratiques */}
          <div className="event-detail-section">
            <h2>Informations pratiques</h2>
            <div className="info-grid">
              <div className="info-card">
                <IcCalendar color="#1a6cf0" />
                <div>
                  <strong>Date et heure</strong>
                  <p>{event.date} à {event.time}</p>
                </div>
              </div>
              <div className="info-card">
                <IcPin color="#1a6cf0" />
                <div>
                  <strong>Lieu</strong>
                  <p>{event.location}</p>
                  <p className="venue-detail">Parc des Expositions d'Abidjan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sélection des tickets */}
          <div className="event-detail-section">
            <h2>Choisissez vos tickets</h2>
            <div className="tickets-list">
              {ticketOptions.map((ticket, index) => (
                <div 
                  key={index} 
                  className={`ticket-item ${selectedTicket === index ? 'selected' : ''}`}
                  onClick={() => setSelectedTicket(index)}
                >
                  <div className="ticket-info">
                    <h3>{ticket.name}</h3>
                    <p>{ticket.benefits}</p>
                  </div>
                  <div className="ticket-price">
                    <span>{ticket.price}</span>
                    <button className="ticket-select-btn">Choisir</button>
                  </div>
                </div>
              ))}
            </div>
            <button className="buy-now-btn">
              <IcTicketBuy /> Acheter tickets
            </button>
          </div>

          {/* Vidéos des éditions précédentes */}
          <div className="event-detail-section">
            <h2>Éditions précédentes</h2>
            <p className="section-subtitle">
              Revivez les meilleurs moments des années passées
            </p>
            
            {/* Vidéo principale */}
            <div className="featured-video">
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${previousEditions[activeVideo].videoId}`}
                title={previousEditions[activeVideo].title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="video-info">
                <h3>{previousEditions[activeVideo].title}</h3>
                <p>{previousEditions[activeVideo].date} • {previousEditions[activeVideo].views}</p>
              </div>
            </div>

            {/* Liste des vidéos */}
            <div className="videos-grid">
              {previousEditions.map((video, index) => (
                <div 
                  key={video.id} 
                  className={`video-card ${activeVideo === index ? 'active' : ''}`}
                  onClick={() => setActiveVideo(index)}
                >
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="video-overlay">
                    <span className="play-icon">▶</span>
                  </div>
                  <div className="video-card-info">
                    <h4>{video.title}</h4>
                    <p>{video.date}</p>
                    <span>{video.views}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Organisateur */}
          <div className="event-detail-section">
            <div className="organizer-card">
              <div className="organizer-avatar">
                {event.publisher?.[0] || 'U'}
              </div>
              <div className="organizer-info">
                <h3>Publié par</h3>
                <p className="organizer-name">{event.publisher || 'ULTRACOM GROUP'}</p>
                <p className="organizer-bio">
                  Organisateur d'événements depuis 2010, spécialisé dans les concerts 
                  et spectacles live en Afrique de l'Ouest.
                </p>
              </div>
              <button className="subscribe-btn-large">S'abonner</button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="event-detail-sidebar">
          <div className="sidebar-card">
            <h3>Partager l'événement</h3>
            <div className="share-buttons">
              <button className="share-btn facebook">Facebook</button>
              <button className="share-btn twitter">Twitter</button>
              <button className="share-btn whatsapp">WhatsApp</button>
            </div>
          </div>
          
          <div className="sidebar-card">
            <h3>Événements similaires</h3>
            <div className="similar-events">
              <div className="similar-event">
                <img src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=100&h=100&fit=crop" alt="Similar" />
                <div>
                  <p>Concert de la Saint-Sylvestre</p>
                  <span>31 déc 2026</span>
                </div>
              </div>
              <div className="similar-event">
                <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=100&fit=crop" alt="Similar" />
                <div>
                  <p>Festival International</p>
                  <span>15 juil 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};