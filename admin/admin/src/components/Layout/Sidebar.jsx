import React from 'react';

export const Sidebar = ({ activePage, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: '📊' },
    { id: 'categories', label: 'Catégories', icon: '📁' },
    { id: 'events', label: 'Événements', icon: '🎫' },
    { id: 'settings', label: 'Paramètres', icon: '⚙️' }
  ];

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">🎫</span>
        <span className="logo-text">TicketAspros</span>
        <span className="logo-badge">Admin</span>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`sidebar-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <button className="sidebar-item" onClick={() => onNavigate('logout')}>
          <span className="sidebar-icon">🚪</span>
          <span className="sidebar-label">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};
