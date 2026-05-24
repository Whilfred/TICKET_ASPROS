export const CategoryChips = ({ active, onChange, categories }) => (
  <div className="cats-row">
    {categories.map(({ id, label, Icon }) => (
      <button
        key={id}
        className={`cat-chip${active === id ? ' active' : ''}`}
        onClick={() => onChange(id)}
      >
        <span className="cat-icon-wrap"><Icon /></span>
        <span className="cat-label">{label}</span>
      </button>
    ))}
  </div>
);