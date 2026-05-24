export const TabsBar = ({ active, onChange }) => (
  <div className="tabs-bar">
    <button
      className={`tab-btn${active === 'events' ? ' active' : ''}`}
      onClick={() => onChange('events')}
    >
      Événements
    </button>
    <button
      className={`tab-btn${active === 'cotisations' ? ' active' : ''}`}
      onClick={() => onChange('cotisations')}
    >
      Cotisations
      <span className="tab-badge">Nouveau</span>
    </button>
  </div>
);