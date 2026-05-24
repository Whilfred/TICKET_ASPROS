import { IcPin, IcChevronDown, IcFilter, IcSearch, IcUsers, IcBell, IcMenu, IcUser } from '../common/Icons';
import { Logo } from './Logo';

export const TopBar = ({ currentPage, onNavigate }) => (
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
      <button className="icon-btn" aria-label="Communauté" onClick={() => onNavigate('community')}>
        <IcUsers />
      </button>
      <button className="icon-btn" aria-label="Notifications" onClick={() => onNavigate('notifications')}>
        <IcBell />
      </button>
      <button className="icon-btn" aria-label="Menu" onClick={() => onNavigate('menu')}>
        <IcMenu />
      </button>
      <button
        className={`icon-btn${currentPage === 'profile' ? ' icon-btn--active' : ''}`}
        aria-label="Mon compte"
        onClick={() => onNavigate('profile')}
      >
        <IcUser color={currentPage === 'profile' ? '#1a6cf0' : '#555'} />
      </button>
    </div>
  </header>
);