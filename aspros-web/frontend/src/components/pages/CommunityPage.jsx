import { IcUsers } from '../common/Icons';

export const CommunityPage = () => (
  <div className="profile-screen">
    <div className="profile-header" style={{ background: 'linear-gradient(135deg, #1a6cf0 0%, #1254c4 100%)' }}>
      <div className="profile-avatar-lg">
        <IcUsers />
      </div>
      <h2 className="profile-name">Communauté</h2>
      <p className="profile-email">Suivez vos organisateurs préférés</p>
    </div>
    <div className="profile-body">
      <div className="profile-section">
        <h3 className="section-title">Organisateurs suivis</h3>
        <div className="empty-tickets">
          <IcUsers />
          <p>Vous ne suivez aucun organisateur pour le moment</p>
          <button className="btn-publish" style={{ marginTop: '16px', background: '#1a6cf0', color: 'white' }}>
            Découvrir des organisateurs
          </button>
        </div>
      </div>
      <div className="profile-section">
        <h3 className="section-title">Suggestions</h3>
        <div className="info-list">
          {['ULTRACOM GROUP', 'THEATRE IVOIRE', 'EVENTS AFRICA', 'BEACH EVENTS CI'].map(org => (
            <div key={org} className="info-row">
              <span className="info-label">{org}</span>
              <button className="subscribe-btn" style={{ background: '#1a6cf0', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>
                Suivre
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);