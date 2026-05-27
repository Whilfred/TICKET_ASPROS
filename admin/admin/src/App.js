import React, { useState, useEffect } from 'react';
import './App.css';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const API_URL = 'http://localhost:8000/api/admin';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({});
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    loadAllData();
  }, [activeTab]);

const loadAllData = async () => {
  setLoading(true);
  try {
    if (activeTab === 'dashboard') {
      const res = await fetch(`${API_URL}/stats`);
      setStats(await res.json());
    }
if (activeTab === 'categories' || activeTab === 'events') {
  const res = await fetch(`${API_URL}/categories`);
  const data = await res.json();
  console.log('Catégories reçues:', data);  // ← Ajoute ce log
  setCategories(Array.isArray(data) ? data : []);
}
    if (activeTab === 'events') {
      const res = await fetch(`${API_URL}/events`);
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    }
    if (activeTab === 'users') {
      const res = await fetch(`${API_URL}/users`);
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    }
    if (activeTab === 'organizers') {
      const res = await fetch(`${API_URL}/organizers`);
      const data = await res.json();
      setOrganizers(Array.isArray(data) ? data : []);
    }
    if (activeTab === 'orders') {
      const res = await fetch(`${API_URL}/orders`);
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    }
  } catch (error) {
    console.error('Erreur:', error);
    setCategories([]);
    setEvents([]);
    setUsers([]);
    setOrganizers([]);
    setOrders([]);
  } finally {
    setLoading(false);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem 
      ? `${API_URL}/${modalType}/${editingItem.id}`
      : `${API_URL}/${modalType}`;
    
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    setShowModal(false);
    loadAllData();
  };

  const handleDelete = async (type, id) => {
    if (window.confirm('Supprimer définitivement ?')) {
      await fetch(`${API_URL}/${type}/${id}`, { method: 'DELETE' });
      loadAllData();
    }
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    if (item) {
      setFormData(item);
    } else {
      if (type === 'categories') setFormData({ name: '', icon: '🎵', color: '#1a6cf0' });
      if (type === 'events') setFormData({ title: '', description: '', date: '', time: '', city: '', venue: '', price: '', image_url: '', category_id: '', status: 'draft' });
      if (type === 'users') setFormData({ name: '', email: '', phone: '', city: '', is_admin: false, is_verified: false });
    }
    setShowModal(true);
  };

  const COLORS = ['#1a6cf0', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  const DashboardCards = () => (
    <div className="stats-grid">
      <div className="stat-card"><div className="stat-icon">📁</div><h3>Catégories</h3><div className="stat-value">{stats.categories || 0}</div></div>
      <div className="stat-card"><div className="stat-icon">🎫</div><h3>Événements</h3><div className="stat-value">{stats.events || 0}</div></div>
      <div className="stat-card"><div className="stat-icon">👥</div><h3>Utilisateurs</h3><div className="stat-value">{stats.users || 0}</div></div>
      <div className="stat-card"><div className="stat-icon">💰</div><h3>Revenus</h3><div className="stat-value">{stats.revenue?.toLocaleString() || 0} FCFA</div></div>
    </div>
  );

  const CategoriesTable = () => (
    <div className="data-table">
      <div className="table-header"><h2>📁 Catégories</h2><button className="btn-add" onClick={() => openModal('categories')}>+ Ajouter</button></div>
      <table><thead><tr><th>ID</th><th>Icône</th><th>Nom</th><th>Couleur</th><th>Actions</th></tr></thead>
      <tbody>{categories.map(cat => (<tr key={cat.id}><td>{cat.id}</td><td className="icon-cell">{cat.icon}</td><td>{cat.name}</td><td><span className="color-badge" style={{ background: cat.color }}>{cat.color}</span></td><td><button className="btn-edit" onClick={() => openModal('categories', cat)}>✏️</button><button className="btn-delete" onClick={() => handleDelete('categories', cat.id)}>🗑️</button></td></tr>))}</tbody></table>
    </div>
  );

  const EventsTable = () => (
    <div className="data-table">
      <div className="table-header"><h2>🎫 Événements</h2><button className="btn-add" onClick={() => openModal('events')}>+ Ajouter</button></div>
      <table><thead><tr><th>ID</th><th>Titre</th><th>Date</th><th>Ville</th><th>Catégorie</th><th>Status</th><th>Ventes</th><th>Actions</th></tr></thead>
      <tbody>{events.map(ev => (<tr key={ev.id}><td>{ev.id}</td><td>{ev.title}</td><td>{ev.date}</td><td>{ev.city}</td><td><span className="category-badge" style={{ background: ev.category_color }}>{ev.category_icon} {ev.category_name}</span></td><td><span className={`status ${ev.status}`}>{ev.status}</span></td><td>{ev.tickets_sold || 0}</td><td><button className="btn-edit" onClick={() => openModal('events', ev)}>✏️</button><button className="btn-delete" onClick={() => handleDelete('events', ev.id)}>🗑️</button></td></tr>))}</tbody></table>
    </div>
  );

const UsersTable = () => (
  <div className="data-table">
    <div className="table-header"><h2>👥 Utilisateurs</h2></div>
    <table>
      <thead>
        <tr><th>ID</th><th>Nom</th><th>Email</th><th>Rôle</th><th>Date</th><th>Actions</th></tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name || user.nom || '-'}</td>
            <td>{user.email}</td>
            <td><span className={`role-badge ${user.role === 'admin' ? 'admin' : 'user'}`}>{user.role || 'user'}</span></td>
            <td>{new Date(user.created_at).toLocaleDateString()}</td>
            <td>
              <button className="btn-edit" onClick={() => openModal('users', user)}>✏️</button>
              <button className="btn-delete" onClick={() => handleDelete('users', user.id)}>🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

  const OrganizersTable = () => (
    <div className="data-table">
      <div className="table-header"><h2>🏢 Promoteurs</h2></div>
      <table><thead><tr><th>Nom</th><th>Événements</th><th>Total likes</th></tr></thead>
      <tbody>{organizers.map(org => (<tr key={org.name}><td>{org.name}</td><td>{org.events_count}</td><td>{org.total_likes?.toLocaleString() || 0}</td></tr>))}</tbody></table>
    </div>
  );

  const OrdersTable = () => (
    <div className="data-table">
      <div className="table-header"><h2>📦 Commandes</h2></div>
      <table><thead><tr><th>ID</th><th>Client</th><th>Événement</th><th>Montant</th><th>Status</th><th>Date</th></tr></thead>
      <tbody>{orders.map(order => (<tr key={order.id}><td>#{order.id}</td><td>{order.user_name || '-'}</td><td>{order.event_title}</td><td>{order.amount?.toLocaleString()} FCFA</td><td><span className={`status ${order.status}`}>{order.status}</span></td><td>{new Date(order.created_at).toLocaleDateString()}</td></tr>))}</tbody></table>
    </div>
  );

  const Modal = () => (
    <div className="modal-overlay"><div className="modal-content"><h3>{editingItem ? 'Modifier' : 'Ajouter'}</h3>
      <form onSubmit={handleSubmit}>
        {modalType === 'categories' && (<><input type="text" placeholder="Nom" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} required /><input type="text" placeholder="Icône" value={formData.icon || '🎵'} onChange={e => setFormData({...formData, icon: e.target.value})} /><input type="color" value={formData.color || '#1a6cf0'} onChange={e => setFormData({...formData, color: e.target.value})} /></>)}
        {modalType === 'events' && (<><input type="text" placeholder="Titre" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} required /><input type="date" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} /><input type="time" value={formData.time || ''} onChange={e => setFormData({...formData, time: e.target.value})} /><input type="text" placeholder="Ville" value={formData.city || ''} onChange={e => setFormData({...formData, city: e.target.value})} /><input type="text" placeholder="Lieu" value={formData.venue || ''} onChange={e => setFormData({...formData, venue: e.target.value})} /><input type="text" placeholder="Prix" value={formData.price || ''} onChange={e => setFormData({...formData, price: e.target.value})} /><textarea placeholder="Description" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} /><select value={formData.category_id || ''} onChange={e => setFormData({...formData, category_id: e.target.value})}><option value="">Choisir</option>{categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}</select><select value={formData.status || 'draft'} onChange={e => setFormData({...formData, status: e.target.value})}><option value="draft">Brouillon</option><option value="published">Publié</option></select></>)}
        {modalType === 'users' && (<><input type="text" placeholder="Nom" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} /><input type="email" placeholder="Email" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} /><input type="text" placeholder="Téléphone" value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})} /><label><input type="checkbox" checked={formData.is_admin || false} onChange={e => setFormData({...formData, is_admin: e.target.checked})} /> Administrateur</label><label><input type="checkbox" checked={formData.is_verified || false} onChange={e => setFormData({...formData, is_verified: e.target.checked})} /> Vérifié</label></>)}
        <div className="form-actions"><button type="submit">Enregistrer</button><button type="button" onClick={() => setShowModal(false)}>Annuler</button></div>
      </form>
    </div></div>
  );

  return (
    <div className="admin-app">
      <aside className="sidebar">
        <div className="sidebar-logo"><span>🎫</span><h2>TicketAspros</h2><span className="badge">Admin</span></div>
        <nav className="sidebar-nav">
          {[{ id: 'dashboard', icon: '📊', label: 'Tableau de bord' },{ id: 'categories', icon: '📁', label: 'Catégories' },{ id: 'events', icon: '🎫', label: 'Événements' },{ id: 'users', icon: '👥', label: 'Utilisateurs' },{ id: 'organizers', icon: '🏢', label: 'Promoteurs' },{ id: 'orders', icon: '📦', label: 'Commandes' }].map(item => (<button key={item.id} className={`nav-item ${activeTab === item.id ? 'active' : ''}`} onClick={() => setActiveTab(item.id)}><span className="nav-icon">{item.icon}</span><span>{item.label}</span></button>))}
        </nav>
        <div className="sidebar-footer"><button className="logout-btn">🚪 Déconnexion</button></div>
      </aside>
      <main className="main-content">
        <header className="content-header"><h1>{activeTab === 'dashboard' ? 'Tableau de bord' : activeTab === 'categories' ? 'Gestion des catégories' : activeTab === 'events' ? 'Gestion des événements' : activeTab === 'users' ? 'Gestion des utilisateurs' : activeTab === 'organizers' ? 'Gestion des promoteurs' : 'Commandes'}</h1></header>
        {loading ? <div className="loading">Chargement...</div> : (<>{activeTab === 'dashboard' && <DashboardCards />}{activeTab === 'categories' && <CategoriesTable />}{activeTab === 'events' && <EventsTable />}{activeTab === 'users' && <UsersTable />}{activeTab === 'organizers' && <OrganizersTable />}{activeTab === 'orders' && <OrdersTable />}</>)}
      </main>
      {showModal && <Modal />}
    </div>
  );
}

export default App;
