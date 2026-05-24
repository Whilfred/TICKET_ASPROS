import { IcBell } from '../common/Icons';

export const NotificationsPage = () => (
  <div className="profile-screen">
    <div className="profile-header" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
      <div className="profile-avatar-lg">
        <IcBell />
      </div>
      <h2 className="profile-name">Notifications</h2>
      <p className="profile-email">Restez informé de vos événements</p>
    </div>
    <div className="profile-body">
      <div className="profile-section">
        <h3 className="section-title">Notifications récentes</h3>
        <div className="empty-tickets">
          <IcBell />
          <p>Aucune notification pour le moment</p>
        </div>
      </div>
      <div className="profile-section">
        <h3 className="section-title">Préférences</h3>
        <div className="info-list">
          {[
            'Nouveaux événements près de chez vous',
            'Offres et promotions',
            'Rappels de vos événements',
          ].map(pref => (
            <div key={pref} className="info-row">
              <span className="info-label">{pref}</span>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);