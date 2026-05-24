"use client";

import React, { useState } from 'react';
import { EventCard, EventData } from '@/components/EventCard';

const MOCK_EVENTS: EventData[] = [
  {
    id: '1',
    title: 'Festival Afrobeat 2026',
    date: 'Mercredi 15 Juillet • 18:00',
    day: '15',
    month: 'Juil',
    location: 'Stade de l\'Amitié, Cotonou',
    category: 'Festival',
    imageUrl: '',
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
    capacity: 5000000,
    sold: 3850000,
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

export default function ExplorePage() {
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<string | null>(null);

  const categories = [
    { name: 'Concerts', icon: '🎤', color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' },
    { name: 'Cinéma', icon: '🎬', color: 'linear-gradient(135deg, #0ea5e9, #0369a1)' },
    { name: 'Solidarité', icon: '🤝', color: 'linear-gradient(135deg, #10b981, #047857)' },
    { name: 'Festivals', icon: '🎪', color: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' },
    { name: 'Spectacles', icon: '🎭', color: 'linear-gradient(135deg, #f43f5e, #be123c)' },
    { name: 'Sports', icon: '⚽', color: 'linear-gradient(135deg, #f59e0b, #b45309)' }
  ];

  // Filter events based on search query and category card selected
  const results = MOCK_EVENTS.filter(event => {
    const matchesSearch = query === '' || 
      event.title.toLowerCase().includes(query.toLowerCase()) ||
      event.location.toLowerCase().includes(query.toLowerCase());

    const matchesCat = !selectedCat || 
      (selectedCat === 'Concerts' && event.category === 'Concert') ||
      (selectedCat === 'Cinéma' && event.category === 'Cinéma') ||
      (selectedCat === 'Solidarité' && event.category === 'Solidarité') ||
      (selectedCat === 'Festivals' && event.category === 'Festival') ||
      (selectedCat === 'Spectacles' && event.category === 'Spectacle');

    return matchesSearch && matchesCat;
  });

  const handleBuyTrigger = (event: EventData) => {
    // Redirect to home with event id or just open home express buy
    window.location.href = `/?buy=${event.id}`;
  };

  return (
    <div style={{ width: '100%', padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Explorer
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Découvrez par catégories et thématiques
        </p>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', width: '100%' }}>
        <svg style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input 
          type="text" 
          placeholder="Artistes, villes, salles..." 
          className="form-input" 
          style={{ paddingLeft: '46px', borderRadius: '24px' }}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (selectedCat) setSelectedCat(null); // clear category on search type
          }}
        />
      </div>

      {/* Categories Grid */}
      {!query && !selectedCat && (
        <div>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
            Parcourir par catégories
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {categories.map((cat) => (
              <div 
                key={cat.name}
                style={{
                  background: cat.color,
                  borderRadius: '16px',
                  height: '90px',
                  padding: '14px',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform 0.2s ease'
                }}
                onClick={() => setSelectedCat(cat.name)}
                className="glow"
              >
                <span style={{ fontSize: '1.5rem' }}>{cat.icon}</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results Header */}
      {(query || selectedCat) && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {selectedCat ? `Catégorie : ${selectedCat}` : 'Résultats de recherche'}
            </h2>
            <button 
              onClick={() => {
                setQuery('');
                setSelectedCat(null);
              }}
              style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 600 }}
            >
              Effacer
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {results.length > 0 ? (
              results.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onBuy={handleBuyTrigger}
                />
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 10px', color: 'var(--text-secondary)' }}>
                Aucun résultat ne correspond à vos critères.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
