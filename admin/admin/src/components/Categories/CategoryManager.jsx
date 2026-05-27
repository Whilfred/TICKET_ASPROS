import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

export const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', icon: '📌', color: '#1a6cf0' });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await api.getCategories();
    setCategories(data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.createCategory(formData);
    setShowForm(false);
    setFormData({ name: '', icon: '📌', color: '#1a6cf0' });
    loadCategories();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer ?')) {
      await api.deleteCategory(id);
      loadCategories();
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2>Catégories</h2>
        <button onClick={() => setShowForm(true)} style={{ background: '#1a6cf0', color: 'white', padding: '8px 16px', border: 'none', borderRadius: 8 }}>
          + Nouvelle catégorie
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: 'white', padding: 20, borderRadius: 12, marginBottom: 20 }}>
          <input type="text" placeholder="Nom" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          <input type="text" placeholder="Icône" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} style={{ marginLeft: 10 }} />
          <input type="color" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} style={{ marginLeft: 10 }} />
          <button type="submit" style={{ marginLeft: 10 }}>Enregistrer</button>
          <button type="button" onClick={() => setShowForm(false)} style={{ marginLeft: 10 }}>Annuler</button>
        </form>
      )}

      <table style={{ width: '100%', background: 'white', borderRadius: 12, overflow: 'hidden' }}>
        <thead style={{ background: '#f0f0f0' }}>
          <tr><th>ID</th><th>Icône</th><th>Nom</th><th>Couleur</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td style={{ fontSize: 24 }}>{cat.icon}</td>
              <td>{cat.name}</td>
              <td><span style={{ background: cat.color, padding: '2px 10px', borderRadius: 20, color: 'white' }}>{cat.color}</span></td>
              <td><button onClick={() => handleDelete(cat.id)} style={{ background: 'red', color: 'white', border: 'none', padding: '4px 12px', borderRadius: 6 }}>🗑️</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
