import React, { useState, useEffect } from 'react';
import './App.css';

// Layout components
import { TopBar } from './components/layout/TopBar';
import { MobileNav } from './components/layout/MobileNav';

// Common components
import { TabsBar } from './components/common/TabsBar';
import { CategoryChips } from './components/common/CategoryChips';
import { EventCard } from './components/events/EventCard';

// Pages
import { CommunityPage } from './components/pages/CommunityPage';
import { NotificationsPage } from './components/pages/NotificationsPage';
import { MenuPage } from './components/pages/MenuPage';
import { ProfilePage } from './components/pages/ProfilePage';

// Data
import { EVENTS } from './data/events';
import { CATEGORIES } from './data/categories';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeSection, setActiveSection] = useState('events');
  const [activeCat, setActiveCat] = useState('all');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const filteredEvents = activeCat === 'all'
    ? EVENTS
    : EVENTS.filter(e => e.category === activeCat);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'profile':
        return <ProfilePage />;
      case 'community':
        return <CommunityPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'menu':
        return <MenuPage onNavigate={handleNavigate} />;
      default:
        return (
          <>
            <TabsBar active={activeSection} onChange={setActiveSection} />
            {activeSection === 'events' && (
              <>
                <CategoryChips active={activeCat} onChange={setActiveCat} categories={CATEGORIES} />
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
            {activeSection === 'cotisations' && (
              <div className="profile-screen">
                <div className="profile-header" style={{ background: '#16a34a' }}>
                  <h2 className="profile-name">Cotisations</h2>
                  <p className="profile-email">Bientôt disponible</p>
                </div>
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div className={`app ${isMobile ? 'is-mobile' : 'is-desktop'}`}>
      <TopBar currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="main-content">
        {renderPage()}
      </main>
      {isMobile && (
        <MobileNav currentPage={currentPage} onNavigate={handleNavigate} />
      )}
    </div>
  );
};

export default App;