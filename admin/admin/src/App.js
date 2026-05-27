import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:8000/api';

function App() {
  const [activeTab, setActiveTab] = useState('categories');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [categoryForm, setCategoryForm] = useState({ name: '', icon: '🎵', color: '#1a6cf0' });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_URL}/admin/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryForm)
      });
      setShowForm(false);
      setCategoryForm({ name: '', icon: '🎵', color: '#1a6cf0' });
      loadCategories();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cette catégorie ?')) {
      await fetch(`${API_URL}/admin/categories/${id}`, { method: 'DELETE' });
      loadCategories();
    }
  };

  const iconOptions = ['🎵', '🎨', '🎓', '🍸', '✈️', '⚽', '🏖️', '🎭', '📚', '💼', '🎪', '📌'];

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="logo">
          <span className="logo-icon">🎫</span>
          <h1>TicketAspros Admin</h1>
        </div>
      </header>

      <div className="admin-tabs">
        <button className={`tab ${activeTab === 'categories' ? 'active' : ''}`} onClick={() => setActiveTab('categories')}>
          📁 Catégories
        </button>
        <button className={`tab ${activeTab === 'events' ? 'active' : ''}`} onClick={() => setActiveTab('events')}>
          🎫 Événements
        </button>
        <button className={`tab ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => setActiveTab('stats')}>
          📊 Statistiques
        </button>
      </div>

      <div className="admin-content">
        <div className="action-bar">
          <button className="btn-add" onClick={() => setShowForm(true)}>
            + Ajouter une catégorie
          </button>
        </div>

        {showForm && (
          <div className="form-modal">
            <div className="form-card">
              <h3>Ajouter une catégorie</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Nom</label>
                  <input type="text" value={categoryForm.name} onChange={e => setCategoryForm({...categoryForm, name: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Icône</label>
                  <div className="icon-grid">
                    {iconOptions.map(icon => (
                      <button key={icon} type="button" className={`icon-btn ${categoryForm.icon === icon ? 'active' : ''}`} onClick={() => setCategoryForm({...categoryForm, icon})}>
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>Couleur</label>
                  <input type="color" value={categoryForm.color} onChange={e => setCategoryForm({...categoryForm, color: e.target.value})} />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-save">Enregistrer</button>
                  <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>Annuler</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="data-table">
            <table>
              <thead>
                <tr><th>ID</th><th>Icône</th><th>Nom</th><th>Couleur</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {categories.map(cat => (
                  <tr key={cat.id}>
                    <td>{cat.id}</td>
                    <td className="icon-cell">{cat.icon}</td>
                    <td>{cat.name}</td>
                    <td><span className="color-badge" style={{ background: cat.color }}>{cat.color}</span></td>
                    <td><button className="btn-delete" onClick={() => handleDelete(cat.id)}>🗑️ Supprimer</button></td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr><td colSpan="5" className="empty-row">Aucune catégorie</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="stats-grid">
            <div className="stat-card"><h3>📁 Catégories</h3><div className="stat-value">{categories.length}</div></div>
            <div className="stat-card"><h3>🎫 Événements</h3><div className="stat-value">0</div></div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="data-table">
            <div className="empty-row">Gestion des événements - Bientôt disponible</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
