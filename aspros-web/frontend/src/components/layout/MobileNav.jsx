import { IcHome, IcUsers, IcBell, IcUser } from '../common/Icons';

export const MobileNav = ({ currentPage, onNavigate }) => (
  <nav className="mobile-nav" aria-label="Navigation principale">
    {[
      { id: 'home', label: 'Accueil', Icon: ({ active }) => <IcHome active={active} /> },
      { id: 'community', label: 'Communaute', Icon: () => <IcUsers /> },
      { id: 'notifications', label: 'Notif', Icon: () => <IcBell /> },
      { id: 'profile', label: 'Profil', Icon: ({ active }) => <IcUser size={22} color={active ? '#1a6cf0' : '#aaa'} /> },
    ].map(({ id, label, Icon }) => (
      <button
        key={id}
        className={`mnav-btn${currentPage === id ? ' active' : ''}`}
        onClick={() => onNavigate(id)}
      >
        <Icon active={currentPage === id} />
        <span>{label}</span>
      </button>
    ))}
  </nav>
);