import React, { useState, useEffect } from 'react';
import './App.css';

// Service API simplifié
const API_URL = 'http://localhost:8000/api';

const api = {
  async getCategories() {
    const res = await fetch(`${API_URL}/categories`);
    return res.json();
  },
  async createCategory(data) {
    const res = await fetch(`${API_URL}/admin/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async updateCategory(id, data) {
    const res = await fetch(`${API_URL}/admin/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async deleteCategory(id) {
    const res = await fetch(`${API_URL}/admin/categories/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },
  async getEvents() {
    const res = await fetch(`${API_URL}/events`);
    return res.json();
  },
  async createEvent(data) {
    const res = await fetch(`${API_URL}/admin/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async updateEvent(id, data) {
    const res = await fetch(`${API_URL}/admin/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async deleteEvent(id) {
    const res = await fetch(`${API_URL}/admin/events/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('categories');
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Formulaire catégorie
  const [categoryForm, setCategoryForm] = useState({ name: '', icon: '🎵', color: '#1a6cf0' });
  
  // Formulaire événement
  const [eventForm, setEventForm] = useState({
    title: '', description: '', date: '', time: '', city: '', venue: '', price: '', image_url: '', category_id: '', status: 'published'
  });

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'categories') {
        const data = await api.getCategories();
        setCategories(data);
      } else {
        const data = await api.getEvents();
        setEvents(data);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.updateCategory(editingId, categoryForm);
    } else {
      await api.createCategory(categoryForm);
    }
    setShowForm(false);
    setEditingId(null);
    setCategoryForm({ name: '', icon: '🎵', color: '#1a6cf0' });
    loadData();
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Supprimer cette catégorie ?')) {
      await api.deleteCategory(id);
      loadData();
    }
  };

  const handleEditCategory = (cat) => {
    setEditingId(cat.id);
    setCategoryForm({ name: cat.name, icon: cat.icon, color: cat.color });
    setShowForm(true);
  };

  const iconOptions = ['🎵', '🎨', '🎓', '🍸', '✈️', '⚽', '🏖️', '🎭', '📚', '💼', '🎪', '📌'];

  return (
    <div className="admin-container">
      {/* Header */}
      <header className="admin-header">
        <div className="logo">
          <span className="logo-icon">🎫</span>
          <h1>TicketAspros Admin</h1>
        </div>
        <div className="header-actions">
          <button className="btn-logout">🚪 Déconnexion</button>
        </div>
      </header>

      {/* Tabs */}
      <div className="admin-tabs">
        <button className={`tab ${activeTab === 'categories' ? 'active' : ''}`} onClick={() => { setActiveTab('categories'); setShowForm(false); }}>
          📁 Catégories
        </button>
        <button className={`tab ${activeTab === 'events' ? 'active' : ''}`} onClick={() => { setActiveTab('events'); setShowForm(false); }}>
          🎫 Événements
        </button>
        <button className={`tab ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => setActiveTab('stats')}>
          📊 Statistiques
        </button>
      </div>

      {/* Content */}
      <div className="admin-content">
        <div className="action-bar">
          <button className="btn-add" onClick={() => { setShowForm(true); setEditingId(null); }}>
            + Ajouter un {activeTab === 'categories' ? 'catégorie' : 'événement'}
          </button>
        </div>

        {/* Formulaire */}
        {showForm && (
          <div className="form-modal">
            <div className="form-card">
              <h3>{editingId ? 'Modifier' : 'Ajouter'} un {activeTab === 'categories' ? 'catégorie' : 'événement'}</h3>
              
              {activeTab === 'categories' ? (
                <form onSubmit={handleCategorySubmit}>
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
                    <button type="button" className="btn-cancel" onClick={() => { setShowForm(false); setEditingId(null); }}>Annuler</button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleEventSubmit}>
                  <div className="form-row">
                    <div className="form-group"><label>Titre</label><input type="text" value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})} required /></div>
                    <div className="form-group"><label>Catégorie</label>
                      <select value={eventForm.category_id} onChange={e => setEventForm({...eventForm, category_id: e.target.value})}>
                        <option value="">Sélectionner</option>
                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label>Date</label><input type="date" value={eventForm.date} onChange={e => setEventForm({...eventForm, date: e.target.value})} required /></div>
                    <div className="form-group"><label>Heure</label><input type="time" value={eventForm.time} onChange={e => setEventForm({...eventForm, time: e.target.value})} required /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label>Ville</label><input type="text" value={eventForm.city} onChange={e => setEventForm({...eventForm, city: e.target.value})} /></div>
                    <div className="form-group"><label>Lieu</label><input type="text" value={eventForm.venue} onChange={e => setEventForm({...eventForm, venue: e.target.value})} /></div>
                  </div>
                  <div className="form-group"><label>Description</label><textarea value={eventForm.description} onChange={e => setEventForm({...eventForm, description: e.target.value})} rows="3" /></div>
                  <div className="form-row">
                    <div className="form-group"><label>Prix</label><input type="text" value={eventForm.price} onChange={e => setEventForm({...eventForm, price: e.target.value})} /></div>
                    <div className="form-group"><label>Image URL</label><input type="url" value={eventForm.image_url} onChange={e => setEventForm({...eventForm, image_url: e.target.value})} /></div>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-save">Enregistrer</button>
                    <button type="button" className="btn-cancel" onClick={() => { setShowForm(false); setEditingId(null); }}>Annuler</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Liste des catégories */}
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
                    <td>
                      <button className="btn-edit" onClick={() => handleEditCategory(cat)}>✏️</button>
                      <button className="btn-delete" onClick={() => handleDeleteCategory(cat.id)}>🗑️</button>
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr><td colSpan="5" className="empty-row">Aucune catégorie</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Liste des événements */}
        {activeTab === 'events' && (
          <div className="data-table">
            <table>
              <thead>
                <tr><th>ID</th><th>Titre</th><th>Date</th><th>Ville</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {events.map(ev => (
                  <tr key={ev.id}>
                    <td>{ev.id}</td>
                    <td>{ev.title}</td>
                    <td>{ev.date}</td>
                    <td>{ev.city}</td>
                    <td><span className={`status ${ev.status}`}>{ev.status || 'published'}</span></td>
                    <td>
                      <button className="btn-edit" onClick={() => handleEditEvent(ev)}>✏️</button>
                      <button className="btn-delete" onClick={() => handleDeleteEvent(ev.id)}>🗑️</button>
                    </td>
                  </tr>
                ))}
                {events.length === 0 && (
                  <tr><td colSpan="6" className="empty-row">Aucun événement</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Statistiques */}
        {activeTab === 'stats' && (
          <div className="stats-grid">
            <div className="stat-card"><h3>📁 Catégories</h3><div className="stat-value">{categories.length}</div></div>
            <div className="stat-card"><h3>🎫 Événements</h3><div className="stat-value">{events.length}</div></div>
            <div className="stat-card"><h3>👥 Utilisateurs</h3><div className="stat-value">-</div></div>
            <div className="stat-card"><h3>💰 Ventes</h3><div className="stat-value">-</div></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;