import { IcMenu, IcHome, IcUsers, IcBell, IcUser } from '../common/Icons';

export const MenuPage = ({ onNavigate }) => (
  <div className="profile-screen">
    <div className="profile-header" style={{ background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)' }}>
      <div className="profile-avatar-lg">
        <IcMenu />
      </div>
      <h2 className="profile-name">Menu</h2>
      <p className="profile-email">Navigation rapide</p>
    </div>
    <div className="profile-body">
      <div className="profile-section">
        <h3 className="section-title">Navigation</h3>
        <div className="info-list">
          <div className="info-row" style={{ cursor: 'pointer' }} onClick={() => onNavigate('home')}>
            <span className="info-label"><IcHome active={false} /> Accueil</span>
            <span className="info-value">→</span>
          </div>
          <div className="info-row" style={{ cursor: 'pointer' }} onClick={() => onNavigate('community')}>
            <span className="info-label"><IcUsers /> Communauté</span>
            <span className="info-value">→</span>
          </div>
          <div className="info-row" style={{ cursor: 'pointer' }} onClick={() => onNavigate('notifications')}>
            <span className="info-label"><IcBell /> Notifications</span>
            <span className="info-value">→</span>
          </div>
          <div className="info-row" style={{ cursor: 'pointer' }} onClick={() => onNavigate('profile')}>
            <span className="info-label"><IcUser /> Mon profil</span>
            <span className="info-value">→</span>
          </div>
        </div>
      </div>
      <div className="profile-section">
        <h3 className="section-title">Liens utiles</h3>
        <div className="info-list">
          <div className="info-row"><span className="info-label">❓ Aide</span><span className="info-value">→</span></div>
          <div className="info-row"><span className="info-label">⚙️ Paramètres</span><span className="info-value">→</span></div>
          <div className="info-row"><span className="info-label">📝 Conditions générales</span><span className="info-value">→</span></div>
          <div className="info-row"><span className="info-label">🔒 Confidentialité</span><span className="info-value">→</span></div>
        </div>
      </div>
    </div>
  </div>
);