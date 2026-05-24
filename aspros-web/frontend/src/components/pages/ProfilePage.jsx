import { IcUser, IcTicketBuy } from '../common/Icons';

export const ProfilePage = () => (
  <div className="profile-screen">
    <div className="profile-header" style={{ background: 'linear-gradient(135deg, #1a6cf0 0%, #1254c4 100%)' }}>
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