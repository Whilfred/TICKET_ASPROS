import React, { useState, useEffect, useCallback } from 'react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts';
import './App.css';

const API = 'http://localhost:8000/api/admin';

// Helpers
const fmt = (n) => Number(n || 0).toLocaleString('fr-FR');
const fmtM = (n) => {
  const v = Number(n || 0);
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + 'M';
  if (v >= 1_000) return (v / 1_000).toFixed(0) + 'k';
  return v.toString();
};
const fmtDate = (s) => s ? new Date(s).toLocaleDateString('fr-FR') : '—';

async function apiFetch(path) {
  try {
    const r = await fetch(API + path);
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return await r.json();
  } catch (e) {
    console.warn('API indisponible pour', path, e);
    return null;
  }
}

async function apiWrite(path, method, body) {
  try {
    const r = await fetch(API + path, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return r;
  } catch (e) {
    console.warn('Écriture API échouée', e);
    return null;
  }
}

// Composant StatCard
function StatCard({ label, value, sub, color, icon, trend, trendLabel }) {
  return (
    <div className={`stat-card sc-${color}`}>
      <div className="sc-top">
        <span className="sc-label">{label}</span>
        <div className="sc-icon">{icon}</div>
      </div>
      <div className="sc-value">{value}</div>
      {(trend !== undefined) && (
        <div className="sc-trend">
          <span className={trend >= 0 ? 'trend-up' : 'trend-down'}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
          {trendLabel && <span className="trend-label">{trendLabel}</span>}
        </div>
      )}
      {sub && !trend && <div className="sc-sub">{sub}</div>}
    </div>
  );
}

// Composant SearchBar
function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="searchbar">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || 'Rechercher…'}
      />
      {value && <button className="search-clear" onClick={() => onChange('')}>✕</button>}
    </div>
  );
}

// Composant FilterSelect
function FilterSelect({ value, onChange, options, label }) {
  return (
    <div className="filter-select-wrap">
      <select value={value} onChange={e => onChange(e.target.value)} className="filter-select">
        <option value="">{label}</option>
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

// Composant EmptyState corrigé
function EmptyState({ message }) {
  return (
    <tr>
      <td colSpan={20} className="empty-cell">
        <div className="empty-state">
          <span className="empty-icon">📭</span>
          <p>{message}</p>
        </div>
      </td>
    </tr>
  );
}

// Composant Modal
function Modal({ show, onClose, title, onSubmit, children }) {
  if (!show) return null;
  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        <div className="modal-hd">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-ft">
          <button className="btn-sec" onClick={onClose}>Annuler</button>
          <button className="btn-pri" onClick={onSubmit}>Enregistrer</button>
        </div>
      </div>
    </div>
  );
}

// Dashboard Page
function DashboardPage({ stats, categories, events, orders }) {
  const [revenueRange, setRevenueRange] = useState('7j');
  const [chartData, setChartData] = useState([]);
  const [catChartData, setCatChartData] = useState([]);

  const loadSalesData = useCallback(async () => {
    const response = await apiFetch(`/sales-stats?period=${revenueRange}`);
    if (response && response.length > 0) {
      setChartData(response);
    } else {
      setChartData([]);
    }
  }, [revenueRange]);

  const loadCategoryData = useCallback(async () => {
    const response = await apiFetch('/category-stats');
    if (response && response.length > 0) {
      setCatChartData(response.filter(c => c.is_active !== false));
    } else if (categories.length > 0) {
      const fallbackData = categories.map(c => ({
        name: c.name,
        icon: c.icon,
        color: c.color,
        events_count: events.filter(e => e.category_id === c.id).length,
        revenue: 0
      }));
      setCatChartData(fallbackData);
    }
  }, [categories, events]);

  useEffect(() => {
    loadSalesData();
    loadCategoryData();
  }, [loadSalesData, loadCategoryData, revenueRange]);

  const revenue = stats.revenue || 0;
  const completedOrders = orders.filter(o => o.status === 'completed' || o.payment_status === 'completed').length;
  const conversionRate = orders.length ? Math.round((completedOrders / orders.length) * 100) : 0;
  const activeEvents = stats.activeEvents || events.filter(e => e.status === 'published' || e.live === true).length;

  const hasSalesData = chartData.length > 0 && chartData.some(d => d.amount > 0);
  const displayChartData = hasSalesData ? chartData : [];

  const pieData = catChartData.filter(c => c.events_count > 0).map(c => ({
    name: c.name,
    value: c.events_count,
    color: c.color
  }));

  return (
    <div className="page-inner">
      <div className="stats-grid">
        <StatCard 
          label="Chiffre d'affaires" 
          value={revenue === 0 ? "0 FCFA" : `${fmtM(revenue)} FCFA`} 
          color="red" 
          icon="💰" 
          trendLabel={revenue === 0 ? "Aucune vente" : undefined} 
        />
        <StatCard 
          label="Événements actifs" 
          value={activeEvents} 
          color="blue" 
          icon="🎫" 
          sub={`${events.length} au total`} 
        />
        <StatCard 
          label="Membres inscrits" 
          value={fmt(stats.users)} 
          color="purple" 
          icon="👥" 
        />
        <StatCard 
          label="Taux de conversion" 
          value={`${conversionRate}%`} 
          color="green" 
          icon="📈" 
          sub={`${completedOrders} / ${orders.length} commandes`} 
        />
      </div>

      <div className="charts-grid">
        <div className="chart-card chart-large">
          <div className="chart-hd">
            <div>
              <h3>Volume financier des ventes</h3>
              <p className="chart-sub">Évolution des encaissements (FCFA)</p>
            </div>
            <div className="chart-tabs">
              {['7j', '30j', '3m'].map(r => (
                <button 
                  key={r} 
                  className={`chart-tab ${revenueRange === r ? 'active' : ''}`} 
                  onClick={() => setRevenueRange(r)}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          {!hasSalesData && revenue === 0 ? (
            <div className="empty-chart">
              <div className="empty-chart-icon">📊</div>
              <p>Aucune vente enregistrée</p>
              <span>Les graphiques s'afficheront dès la première vente</span>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={displayChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradRed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e8380d" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#e8380d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0efec" vertical={false} />
                <XAxis dataKey="name" stroke="#9d9c99" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis 
                  stroke="#9d9c99" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={v => v === 0 ? '0' : fmtM(v)} 
                />
                <Tooltip 
                  contentStyle={{ background: '#1a1917', border: 'none', borderRadius: 10, color: '#fff', fontSize: 12 }} 
                  formatter={v => [`${fmt(v)} FCFA`, 'Recettes']} 
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#e8380d" 
                  strokeWidth={2.5} 
                  fill="url(#gradRed)" 
                  dot={{ r: 3, strokeWidth: 0, fill: '#e8380d' }} 
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="chart-card">
          <div className="chart-hd">
            <div>
              <h3>Par catégorie</h3>
              <p className="chart-sub">Répartition des événements</p>
            </div>
          </div>
          {pieData.length === 0 ? (
            <div className="empty-chart" style={{ height: 220 }}>
              <div className="empty-chart-icon">🥧</div>
              <p>Aucune catégorie avec événements</p>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 220 }}>
              <ResponsiveContainer width="50%" height={180}>
                <PieChart>
                  <Pie 
                    data={pieData} 
                    dataKey="value" 
                    nameKey="name" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={70} 
                    innerRadius={40}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ background: '#1a1917', border: 'none', borderRadius: 10, color: '#fff', fontSize: 12 }}
                    formatter={(value, name) => [`${value} événements`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="donut-legend">
                {pieData.map(c => (
                  <div key={c.name} className="donut-legend-row">
                    <span className="donut-dot" style={{ background: c.color }}></span>
                    <span className="donut-name">{c.name}</span>
                    <span className="donut-val">{c.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Events Page
function EventsPage({ events, categories, onRefresh }) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const activeCategories = categories.filter(c => c.is_active !== false);

  const filtered = events
    .filter(e => !search || e.title.toLowerCase().includes(search.toLowerCase()) || (e.city || '').toLowerCase().includes(search.toLowerCase()))
    .filter(e => !filterStatus || (filterStatus === 'published' ? e.status === 'published' || e.live === true : e.status === 'draft' || e.live === false))
    .filter(e => !filterCat || e.category_id === parseInt(filterCat))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const openModal = (item = null) => {
    setEditing(item);
    setForm(item ? { 
      ...item, 
      status: item.status || (item.live ? 'published' : 'draft')
    } : { 
      title: '', description: '', date: '', time: '', city: '', venue: '', 
      price: '', category_id: '', status: 'draft', publisher: '' 
    });
    setModal(true);
  };

  const handleSubmit = async () => {
    const payload = {
      title: form.title,
      description: form.description,
      date: form.date,
      time: form.time,
      city: form.city,
      venue: form.venue,
      price: form.price,
      category_id: form.category_id ? parseInt(form.category_id) : null,
      status: form.status,
      publisher: form.publisher
    };
    const method = editing ? 'PUT' : 'POST';
    const path = editing ? `/events/${editing.id}` : '/events';
    await apiWrite(path, method, payload);
    setModal(false);
    onRefresh('events');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cet événement ?')) return;
    await apiWrite(`/events/${id}`, 'DELETE');
    onRefresh('events');
  };

  const totalTickets = events.reduce((s, e) => s + (e.tickets_sold || 0), 0);
  const totalRevenue = events.reduce((s, e) => s + ((e.tickets_sold || 0) * (parseInt(e.price) || 0)), 0);
  const publishedCount = events.filter(e => e.status === 'published' || e.live === true).length;

  return (
    <div className="page-inner">
      <div className="stats-grid stats-grid-4">
        <StatCard label="Total événements" value={events.length} color="blue" icon="🎫" />
        <StatCard label="Publiés" value={publishedCount} color="green" icon="🟢" sub={`${events.length - publishedCount} brouillons`} />
        <StatCard label="Billets vendus" value={fmt(totalTickets)} color="red" icon="🎟️" />
        <StatCard label="CA événements" value={`${fmtM(totalRevenue)} FCFA`} color="purple" icon="💰" />
      </div>

      <div className="table-section">
        <div className="table-toolbar">
          <div className="toolbar-left">
            <SearchBar value={search} onChange={setSearch} placeholder="Rechercher un événement…" />
            <FilterSelect value={filterStatus} onChange={setFilterStatus} label="Statut" options={[{ value: 'published', label: '🟢 En ligne' }, { value: 'draft', label: '🟠 Brouillon' }]} />
            <FilterSelect value={filterCat} onChange={setFilterCat} label="Catégorie" options={activeCategories.map(c => ({ value: c.id.toString(), label: `${c.icon} ${c.name}` }))} />
          </div>
          <div className="toolbar-right">
            <button className="btn-add" onClick={() => openModal()}>+ Créer</button>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Titre</th><th>Date & Lieu</th><th>Catégorie</th>
                <th>Prix</th><th>Billets</th><th>Statut</th><th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <EmptyState message="Aucun événement" />
              ) : filtered.map(ev => (
                <tr key={ev.id}>
                  <td className="tid">#{ev.id}</td>
                  <td className="tfont">{ev.title}</td>
                  <td>
                    <div className="tmuted">{ev.date}</div>
                    <div className="tsub">📍 {ev.city}</div>
                  </td>
                  <td>
                    <span className="cat-pill" style={{ background: (ev.category_color || '#888') + '18', color: ev.category_color || '#888' }}>
                      {ev.category_icon} {ev.category_name || '—'}
                    </span>
                  </td>
                  <td className="num-cell">{fmt(ev.price)} FCFA</td>
                  <td className="num-cell">{ev.tickets_sold || 0}</td>
                  <td><span className={`tag-pill ${ev.status === 'published' || ev.live ? 'pub' : 'dra'}`}>{ev.status === 'published' || ev.live ? 'En ligne' : 'Brouillon'}</span></td>
                  <td>
                    <div className="action-grp">
                      <button className="btn-act" onClick={() => openModal(ev)}>✏️</button>
                      <button className="btn-act" onClick={() => handleDelete(ev.id)}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={modal} onClose={() => setModal(false)} title={editing ? 'Modifier' : 'Créer'} onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group span2"><label>Titre</label><input value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
          <div className="form-group"><label>Date</label><input type="date" value={form.date || ''} onChange={e => setForm({ ...form, date: e.target.value })} /></div>
          <div className="form-group"><label>Heure</label><input type="time" value={form.time || ''} onChange={e => setForm({ ...form, time: e.target.value })} /></div>
          <div className="form-group"><label>Ville</label><input value={form.city || ''} onChange={e => setForm({ ...form, city: e.target.value })} /></div>
          <div className="form-group"><label>Lieu</label><input value={form.venue || ''} onChange={e => setForm({ ...form, venue: e.target.value })} /></div>
          <div className="form-group"><label>Prix</label><input type="number" value={form.price || ''} onChange={e => setForm({ ...form, price: e.target.value })} /></div>
          <div className="form-group"><label>Catégorie</label>
            <select value={form.category_id || ''} onChange={e => setForm({ ...form, category_id: e.target.value })}>
              <option value="">Choisir</option>
              {activeCategories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
            </select>
          </div>
          <div className="form-group"><label>Promoteur</label><input value={form.publisher || ''} onChange={e => setForm({ ...form, publisher: e.target.value })} placeholder="Nom du promoteur" /></div>
          <div className="form-group span2"><label>Description</label><textarea rows={3} value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
          <div className="form-group span2">
            <label>Statut</label>
            <select value={form.status || 'draft'} onChange={e => setForm({ ...form, status: e.target.value })}>
              <option value="draft">Brouillon</option>
              <option value="published">Publié</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// Categories Page
function CategoriesPage({ categories, events, onRefresh }) {
  const [search, setSearch] = useState('');
  const [filterActive, setFilterActive] = useState('all');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const withCounts = categories.map(c => ({ 
    ...c, 
    count: events.filter(e => e.category_id === c.id).length,
    is_active: c.is_active !== false
  }));
  
  const filtered = withCounts
    .filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()))
    .filter(c => {
      if (filterActive === 'active') return c.is_active === true;
      if (filterActive === 'inactive') return c.is_active === false;
      return true;
    });

  const activeCount = withCounts.filter(c => c.is_active).length;
  const inactiveCount = withCounts.filter(c => !c.is_active).length;

  const openModal = (item = null) => {
    setEditing(item);
    setForm(item ? { ...item, is_active: item.is_active !== false } : { name: '', icon: '🎵', color: '#e11d48', is_active: true });
    setModal(true);
  };

  const handleSubmit = async () => {
    const method = editing ? 'PUT' : 'POST';
    const path = editing ? `/categories/${editing.id}` : '/categories';
    await apiWrite(path, method, form);
    setModal(false);
    onRefresh('categories');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette catégorie ?')) return;
    const response = await apiWrite(`/categories/${id}`, 'DELETE');
    if (response && !response.ok) {
      const error = await response.json();
      alert(error.error || 'Impossible de supprimer cette catégorie');
    } else {
      onRefresh('categories');
    }
  };

  const toggleCategoryStatus = async (id, currentStatus) => {
    const category = categories.find(c => c.id === id);
    if (!category) return;
    
    const updatedCategory = { ...category, is_active: !currentStatus };
    const method = 'PUT';
    const path = `/categories/${id}`;
    await apiWrite(path, method, updatedCategory);
    onRefresh('categories');
  };

  return (
    <div className="page-inner">
      <div className="stats-grid stats-grid-3">
        <StatCard label="Total catégories" value={categories.length} color="blue" icon="📁" />
        <StatCard label="Catégories actives" value={activeCount} color="green" icon="✅" sub={`${inactiveCount} inactives`} />
        <StatCard label="Catégories utilisées" value={withCounts.filter(c => c.count > 0).length} color="purple" icon="🎯" sub={`sur ${categories.length}`} />
      </div>

      <div className="table-section">
        <div className="table-toolbar">
          <div className="toolbar-left">
            <SearchBar value={search} onChange={setSearch} placeholder="Rechercher…" />
            <div className="filter-bar">
              <button className={`filter-btn ${filterActive === 'all' ? 'active' : ''}`} onClick={() => setFilterActive('all')}>Toutes</button>
              <button className={`filter-btn ${filterActive === 'active' ? 'active' : ''}`} onClick={() => setFilterActive('active')}>Actives</button>
              <button className={`filter-btn ${filterActive === 'inactive' ? 'active' : ''}`} onClick={() => setFilterActive('inactive')}>Inactives</button>
            </div>
          </div>
          <div className="toolbar-right">
            <button className="btn-add" onClick={() => openModal()}>+ Nouvelle</button>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>ID</th><th>Icône</th><th>Nom</th><th>Couleur</th><th>Événements</th><th>Statut</th><th></th></tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? <EmptyState message="Aucune catégorie" /> : filtered.map(c => (
                <tr key={c.id}>
                  <td className="tid">#{c.id}</td>
                  <td style={{ fontSize: 20 }}>{c.icon}</td>
                  <td className="tfont">{c.name}</td>
                  <td><div className="color-cell"><span className="color-dot" style={{ background: c.color }}></span><span className="tid">{c.color}</span></div></td>
                  <td><span className="num-badge">{c.count}</span></td>
                  <td>
                    <button 
                      className={`status-toggle ${c.is_active ? 'active' : 'inactive'}`}
                      onClick={() => toggleCategoryStatus(c.id, c.is_active)}
                    >
                      {c.is_active ? '✅ Actif' : '⭕ Inactif'}
                    </button>
                  </td>
                  <td><div className="action-grp"><button className="btn-act" onClick={() => openModal(c)}>✏️</button><button className="btn-act" onClick={() => handleDelete(c.id)}>🗑️</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={modal} onClose={() => setModal(false)} title={editing ? 'Modifier' : 'Nouvelle catégorie'} onSubmit={handleSubmit}>
        <div className="form-group"><label>Nom</label><input value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
        <div className="form-group"><label>Icône</label><input value={form.icon || ''} onChange={e => setForm({ ...form, icon: e.target.value })} /></div>
        <div className="form-group"><label>Couleur</label><input type="color" value={form.color || '#e11d48'} onChange={e => setForm({ ...form, color: e.target.value })} /></div>
        <div className="form-group">
          <label>Statut</label>
          <select value={form.is_active ? 'active' : 'inactive'} onChange={e => setForm({ ...form, is_active: e.target.value === 'active' })}>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
        </div>
      </Modal>
    </div>
  );
}

// Users Page
function UsersPage({ users, onRefresh }) {
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const filtered = users
    .filter(u => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
    .filter(u => !filterRole || u.role === filterRole);

  const openModal = (item = null) => {
    setEditing(item);
    setForm(item ? { ...item } : { name: '', email: '', phone: '', city: '', role: 'customer' });
    setModal(true);
  };

  const handleSubmit = async () => {
    const method = editing ? 'PUT' : 'POST';
    const path = editing ? `/users/${editing.id}` : '/users';
    await apiWrite(path, method, form);
    setModal(false);
    onRefresh('users');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cet utilisateur ?')) return;
    await apiWrite(`/users/${id}`, 'DELETE');
    onRefresh('users');
  };

  const adminCount = users.filter(u => u.role === 'admin').length;

  return (
    <div className="page-inner">
      <div className="stats-grid stats-grid-4">
        <StatCard label="Total membres" value={fmt(users.length)} color="blue" icon="👥" />
        <StatCard label="Administrateurs" value={adminCount} color="red" icon="🛡️" sub={`${users.length - adminCount} clients`} />
      </div>

      <div className="table-section">
        <div className="table-toolbar">
          <div className="toolbar-left">
            <SearchBar value={search} onChange={setSearch} placeholder="Nom, email…" />
            <FilterSelect value={filterRole} onChange={setFilterRole} label="Rôle" options={[{ value: 'admin', label: '🛡️ Admin' }, { value: 'customer', label: '👤 Client' }]} />
          </div>
          <div className="toolbar-right"><button className="btn-add" onClick={() => openModal()}>+ Ajouter</button></div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>ID</th><th>Nom</th><th>Email</th><th>Téléphone</th><th>Ville</th><th>Rôle</th><th>Inscrit le</th><th></th></tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? <EmptyState message="Aucun utilisateur" /> : filtered.map(u => (
                <tr key={u.id}>
                  <td className="tid">#{u.id}</td>
                  <td className="tfont">{u.name}</td>
                  <td className="tmuted">{u.email}</td>
                  <td className="tmuted">{u.phone || '—'}</td>
                  <td className="tmuted">{u.city || '—'}</td>
                  <td><span className={`tag-pill ${u.role === 'admin' ? 'admin' : 'ok'}`}>{u.role === 'admin' ? '🛡️ Admin' : '👤 Client'}</span></td>
                  <td className="tmuted tsub">{fmtDate(u.created_at)}</td>
                  <td><div className="action-grp"><button className="btn-act" onClick={() => openModal(u)}>✏️</button><button className="btn-act" onClick={() => handleDelete(u.id)}>🗑️</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={modal} onClose={() => setModal(false)} title={editing ? 'Modifier' : 'Nouvel utilisateur'} onSubmit={handleSubmit}>
        <div className="form-group"><label>Nom</label><input value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
        <div className="form-group"><label>Email</label><input type="email" value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
        <div className="form-group"><label>Téléphone</label><input value={form.phone || ''} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
        <div className="form-group"><label>Ville</label><input value={form.city || ''} onChange={e => setForm({ ...form, city: e.target.value })} /></div>
        <div className="form-group"><label>Rôle</label>
          <select value={form.role || 'customer'} onChange={e => setForm({ ...form, role: e.target.value })}>
            <option value="customer">Client</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>
      </Modal>
    </div>
  );
}

// Orders Page
function OrdersPage({ orders }) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filtered = orders
    .filter(o => !search || o.user_name?.toLowerCase().includes(search.toLowerCase()) || o.event_title?.toLowerCase().includes(search.toLowerCase()))
    .filter(o => !filterStatus || o.status === filterStatus);

  const completed = orders.filter(o => o.status === 'completed');
  const totalRevenue = completed.reduce((s, o) => s + (o.amount || 0), 0);

  return (
    <div className="page-inner">
      <div className="stats-grid stats-grid-4">
        <StatCard label="Total commandes" value={fmt(orders.length)} color="blue" icon="📦" />
        <StatCard label="Validées" value={completed.length} color="green" icon="✅" />
        <StatCard label="Revenus" value={`${fmtM(totalRevenue)} FCFA`} color="purple" icon="💰" />
      </div>

      <div className="table-section">
        <div className="table-toolbar">
          <div className="toolbar-left">
            <SearchBar value={search} onChange={setSearch} placeholder="Acheteur, événement…" />
            <FilterSelect value={filterStatus} onChange={setFilterStatus} label="Statut" options={[{ value: 'completed', label: '✅ Validé' }, { value: 'pending', label: '⏳ En attente' }, { value: 'failed', label: '❌ Échec' }]} />
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>ID</th><th>N° Commande</th><th>Acheteur</th><th>Événement</th><th>Quantité</th><th>Montant</th><th>Statut</th><th>Date</th></tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? <EmptyState message="Aucune commande" /> : filtered.map(o => (
                <tr key={o.id}>
                  <td className="tid">#{o.id}</td>
                  <td className="tid">{o.order_number}</td>
                  <td className="tfont">{o.user_name || 'Anonyme'}</td>
                  <td className="tmuted">{o.event_title || '—'}</td>
                  <td className="num-cell">{o.quantite || 1}</td>
                  <td className="price-cell">{fmt(o.amount)} FCFA</td>
                  <td><span className={`tag-pill ${o.status === 'completed' ? 'pub' : o.status === 'pending' ? 'warn' : 'err'}`}>{o.status === 'completed' ? '✅ Validé' : o.status === 'pending' ? '⏳ En attente' : '❌ Échec'}</span></td>
                  <td className="tmuted tsub">{fmtDate(o.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Organizers Page
function OrganizersPage({ organizers }) {
  const [search, setSearch] = useState('');
  const filtered = organizers.filter(o => !search || o.name.toLowerCase().includes(search.toLowerCase()));
  const totalEvents = organizers.reduce((s, o) => s + (o.events_count || 0), 0);

  return (
    <div className="page-inner">
      <div className="stats-grid stats-grid-3">
        <StatCard label="Total promoteurs" value={organizers.length} color="blue" icon="🏢" />
        <StatCard label="Total événements" value={fmt(totalEvents)} color="green" icon="🎫" />
      </div>

      <div className="table-section">
        <div className="table-toolbar">
          <SearchBar value={search} onChange={setSearch} placeholder="Rechercher un promoteur…" />
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>#</th><th>Promoteur</th><th>Événements</th><th>Revenu total</th></tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? <EmptyState message="Aucun promoteur" /> : filtered.map((o, i) => (
                <tr key={o.name}>
                  <td className="rank-cell">{i + 1}</td>
                  <td className="tfont">{o.name}</td>
                  <td className="num-cell">{o.events_count} événement(s)</td>
                  <td className="price-cell">{fmtM(o.total_revenue || 0)} FCFA</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Main App
const NAV = [
  { id: 'dashboard', icon: '📊', label: 'Tableau de bord' },
  { id: 'events', icon: '🎫', label: 'Événements' },
  { id: 'categories', icon: '📁', label: 'Catégories' },
  { id: 'users', icon: '👥', label: 'Utilisateurs' },
  { id: 'organizers', icon: '🏢', label: 'Promoteurs' },
  { id: 'orders', icon: '📦', label: 'Commandes' },
];

export default function App() {
  const [tab, setTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    stats: { users: 0, events: 0, activeEvents: 0, orders: 0, revenue: 0 },
    categories: [],
    events: [],
    users: [],
    organizers: [],
    orders: [],
  });

  const loadAll = useCallback(async (section = 'all') => {
    setLoading(true);
    try {
      const updates = {};
      
      if (section === 'all' || section === 'dashboard') {
        const stats = await apiFetch('/stats');
        if (stats) updates.stats = stats;
      }
      if (section === 'all' || section === 'categories') {
        const cats = await apiFetch('/categories');
        if (cats) updates.categories = cats;
      }
      if (section === 'all' || section === 'events') {
        const evts = await apiFetch('/events');
        if (evts) updates.events = evts;
      }
      if (section === 'all' || section === 'users') {
        const usrs = await apiFetch('/users');
        if (usrs) updates.users = usrs;
      }
      if (section === 'all' || section === 'organizers') {
        const orgs = await apiFetch('/organizers');
        if (orgs) updates.organizers = orgs;
      }
      if (section === 'all' || section === 'orders') {
        const ords = await apiFetch('/orders');
        if (ords) updates.orders = ords;
      }
      
      setData(prev => ({ ...prev, ...updates }));
    } catch (e) {
      console.error('Erreur chargement:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadAll('all'); }, [loadAll]);

  const onRefresh = (section) => loadAll(section);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="sidebar-logo">
            <div className="logo-mark">🎫</div>
            <div className="logo-text">
              <div className="logo-name">TicketAspros</div>
              <div className="logo-sub">Admin Console</div>
            </div>
          </div>
          <nav className="sidebar-nav">
            {NAV.map(item => (
              <button key={item.id} className={`nav-item ${tab === item.id ? 'active' : ''}`} onClick={() => setTab(item.id)}>
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <div className="main-area">
        <header className="top-header">
          <div className="header-left">
            <h1 className="page-heading">{NAV.find(n => n.id === tab)?.label}</h1>
          </div>
          <div className="header-right">
            <div className="user-pill">
              <div className="user-avatar">A</div>
              <div className="user-info">
                <div className="user-name">Administrateur</div>
              </div>
            </div>
          </div>
        </header>

        <main className="main-content">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Chargement des données...</p>
            </div>
          ) : (
            <>
              {tab === 'dashboard' && <DashboardPage stats={data.stats} categories={data.categories} events={data.events} orders={data.orders} />}
              {tab === 'events' && <EventsPage events={data.events} categories={data.categories} onRefresh={onRefresh} />}
              {tab === 'categories' && <CategoriesPage categories={data.categories} events={data.events} onRefresh={onRefresh} />}
              {tab === 'users' && <UsersPage users={data.users} onRefresh={onRefresh} />}
              {tab === 'organizers' && <OrganizersPage organizers={data.organizers} />}
              {tab === 'orders' && <OrdersPage orders={data.orders} />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}