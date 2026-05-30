import React from 'react';
import { 
  LayoutDashboard, 
  FolderTree, 
  CalendarDays, 
  Settings, 
  LogOut,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Users,
  DollarSign,
  Ticket
} from 'lucide-react';

export const Sidebar = ({ activePage, onNavigate, collapsed = false, onToggleCollapse, showInsights = true }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard, insight: '+23%' },
    { id: 'categories', label: 'Catégories', icon: FolderTree, insight: '12' },
    { id: 'events', label: 'Événements', icon: CalendarDays, insight: '48' },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ];

  const insightsData = {
    dashboard: { value: '+23%', label: 'vs mois dernier', trend: 'up' },
    categories: { value: '12', label: 'catégories actives', trend: 'stable' },
    events: { value: '48', label: 'événements à venir', trend: 'up' }
  };

  return (
    <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon-wrapper">
            <Sparkles className="logo-icon" size={24} />
          </div>
          {!collapsed && (
            <>
              <div className="logo-text">
                <span className="logo-title">TicketAspros</span>
                <span className="logo-subtitle">Administration</span>
              </div>
              <div className="logo-badge">Pro</div>
            </>
          )}
        </div>
        
        <button className="collapse-btn" onClick={onToggleCollapse}>
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <div className="sidebar-user">
        <div className="user-avatar">
          <img 
            src="https://ui-avatars.com/api/?background=6366f1&color=fff&name=Admin" 
            alt="Admin"
          />
        </div>
        {!collapsed && (
          <div className="user-info">
            <div className="user-name">Alexandre Martin</div>
            <div className="user-role">Super Administrateur</div>
          </div>
        )}
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-section">
          {!collapsed && <span className="nav-section-title">Principal</span>}
          {menuItems.map(item => {
            const Icon = item.icon;
            const insight = insightsData[item.id];
            
            return (
              <button
                key={item.id}
                className={`sidebar-item ${activePage === item.id ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                <Icon size={20} className="sidebar-icon" />
                {!collapsed && (
                  <>
                    <span className="sidebar-label">{item.label}</span>
                    {showInsights && insight && (
                      <div className={`sidebar-insight ${insight.trend}`}>
                        <TrendingUp size={12} />
                        <span>{insight.value}</span>
                      </div>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>

        {showInsights && !collapsed && (
          <div className="nav-section insights-preview">
            <span className="nav-section-title">Aperçu rapide</span>
            <div className="stats-preview">
              <div className="stat-item">
                <Users size={16} />
                <div>
                  <div className="stat-value">1,234</div>
                  <div className="stat-label">Utilisateurs</div>
                </div>
              </div>
              <div className="stat-item">
                <Ticket size={16} />
                <div>
                  <div className="stat-value">567</div>
                  <div className="stat-label">Billets vendus</div>
                </div>
              </div>
              <div className="stat-item">
                <DollarSign size={16} />
                <div>
                  <div className="stat-value">€12.4K</div>
                  <div className="stat-label">Revenus</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      <div className="sidebar-footer">
        <button className="sidebar-item logout" onClick={() => onNavigate('logout')}>
          <LogOut size={20} className="sidebar-icon" />
          {!collapsed && <span className="sidebar-label">Déconnexion</span>}
        </button>
      </div>

      <style jsx>{`
        .admin-sidebar {
          width: 280px;
          height: 100vh;
          background: linear-gradient(135deg, #1a1c2e 0%, #1f2142 100%);
          color: #a1a5c3;
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          top: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          overflow-y: auto;
          scrollbar-width: thin;
        }

        .admin-sidebar.collapsed {
          width: 80px;
        }

        .admin-sidebar::-webkit-scrollbar {
          width: 4px;
        }

        .admin-sidebar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        .admin-sidebar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }

        .sidebar-header {
          padding: 24px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .collapsed .sidebar-logo {
          justify-content: center;
        }

        .logo-icon-wrapper {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .logo-text {
          flex: 1;
        }

        .logo-title {
          display: block;
          font-size: 18px;
          font-weight: 700;
          color: white;
          letter-spacing: -0.3px;
        }

        .logo-subtitle {
          display: block;
          font-size: 11px;
          color: #8183a3;
          margin-top: 2px;
        }

        .logo-badge {
          background: rgba(99, 102, 241, 0.2);
          color: #818cf8;
          font-size: 10px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 12px;
          border: 1px solid rgba(99, 102, 241, 0.3);
        }

        .collapse-btn {
          position: absolute;
          right: -12px;
          top: 50%;
          transform: translateY(-50%);
          width: 24px;
          height: 24px;
          background: #2d2f4f;
          border: none;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #a1a5c3;
          transition: all 0.2s;
        }

        .collapse-btn:hover {
          background: #3d3f6a;
          color: white;
        }

        .sidebar-user {
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .collapsed .sidebar-user {
          justify-content: center;
          padding: 20px 0;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .user-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .user-name {
          color: white;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 2px;
        }

        .user-role {
          font-size: 11px;
          color: #8183a3;
        }

        .sidebar-nav {
          flex: 1;
          padding: 20px 0;
        }

        .nav-section {
          margin-bottom: 24px;
        }

        .nav-section-title {
          display: block;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 0 20px;
          margin-bottom: 12px;
          color: #6b6d8f;
        }

        .sidebar-item {
          width: 100%;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          background: transparent;
          border: none;
          color: #a1a5c3;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
          font-weight: 500;
          position: relative;
        }

        .collapsed .sidebar-item {
          justify-content: center;
          padding: 12px;
        }

        .sidebar-item:hover {
          background: rgba(99, 102, 241, 0.1);
          color: white;
        }

        .sidebar-item.active {
          background: linear-gradient(90deg, rgba(99, 102, 241, 0.15) 0%, transparent 100%);
          color: #818cf8;
          border-left: 3px solid #6366f1;
        }

        .sidebar-item.logout:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #f87171;
        }

        .sidebar-icon {
          flex-shrink: 0;
        }

        .sidebar-label {
          flex: 1;
          text-align: left;
        }

        .sidebar-insight {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 12px;
          background: rgba(34, 197, 94, 0.1);
          color: #4ade80;
        }

        .sidebar-insight.down {
          background: rgba(239, 68, 68, 0.1);
          color: #f87171;
        }

        .insights-preview {
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .stats-preview {
          padding: 0 20px;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 0;
          font-size: 12px;
        }

        .stat-value {
          color: white;
          font-weight: 600;
          font-size: 14px;
        }

        .stat-label {
          font-size: 10px;
          color: #6b6d8f;
        }

        .sidebar-footer {
          padding: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .collapsed .sidebar-footer {
          padding: 20px 0;
        }
      `}</style>
    </aside>
  );
};