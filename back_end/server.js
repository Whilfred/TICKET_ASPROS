const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'ticket_aspros',
  password: process.env.DB_PASSWORD || 'votre_mot_de_passe',
  port: process.env.DB_PORT || 5432,
});

pool.connect((err) => {
  if (err) console.error('❌ Erreur PostgreSQL:', err);
  else console.log('✅ Connecté à PostgreSQL');
});

// ==================== DASHBOARD STATS ====================
app.get('/api/admin/stats', async (req, res) => {
  try {
    const userResult = await pool.query('SELECT COUNT(*) FROM users');
    const evtResult = await pool.query('SELECT COUNT(*) FROM events');
    const activeEventsResult = await pool.query("SELECT COUNT(*) FROM events WHERE status = 'published'");
    const orderResult = await pool.query('SELECT COUNT(*) FROM orders');
    const revenueResult = await pool.query("SELECT COALESCE(SUM(total_amount), 0) as total FROM orders WHERE status = 'paid'");
    
    res.json({
      users: parseInt(userResult.rows[0].count) || 0,
      events: parseInt(evtResult.rows[0].count) || 0,
      activeEvents: parseInt(activeEventsResult.rows[0].count) || 0,
      orders: parseInt(orderResult.rows[0].count) || 0,
      revenue: parseInt(revenueResult.rows[0].total) || 0
    });
  } catch (err) {
    console.error('Erreur stats:', err);
    res.json({ users: 0, events: 0, activeEvents: 0, orders: 0, revenue: 0 });
  }
});

// ==================== CATEGORIES ====================
app.get('/api/admin/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, icon, color FROM categories ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur categories:', err);
    res.json([]);
  }
});

app.post('/api/admin/categories', async (req, res) => {
  const { name, icon, color } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO categories (name, icon, color) VALUES ($1, $2, $3) RETURNING *',
      [name, icon, color]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/admin/categories/:id', async (req, res) => {
  const { id } = req.params;
  const { name, icon, color } = req.body;
  try {
    const result = await pool.query(
      'UPDATE categories SET name = $1, icon = $2, color = $3 WHERE id = $4 RETURNING *',
      [name, icon, color, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/categories/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const checkResult = await pool.query('SELECT COUNT(*) FROM events WHERE category_id = $1', [id]);
    if (parseInt(checkResult.rows[0].count) > 0) {
      return res.status(400).json({ error: 'Cette catégorie est utilisée par des événements' });
    }
    await pool.query('DELETE FROM categories WHERE id = $1', [id]);
    res.json({ message: 'Catégorie supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== EVENTS ====================
app.get('/api/admin/events', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        e.*,
        c.name as category_name,
        c.icon as category_icon,
        c.color as category_color
      FROM events e
      LEFT JOIN categories c ON e.category_id = c.id
      ORDER BY e.date DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur events:', err);
    res.json([]);
  }
});

app.get('/api/admin/events/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      SELECT 
        e.*,
        c.name as category_name,
        c.icon as category_icon,
        c.color as category_color
      FROM events e
      LEFT JOIN categories c ON e.category_id = c.id
      WHERE e.id = $1
    `, [id]);
    if (result.rows[0]) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Événement non trouvé' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/admin/events', async (req, res) => {
  const { title, description, date, time, city, venue, image_url, category_id, status, organizer_id } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO events (title, description, date, time, city, venue, image_url, category_id, status, organizer_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [title, description, date, time, city, venue, image_url, category_id, status || 'draft', organizer_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/admin/events/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, date, time, city, venue, image_url, category_id, status, organizer_id } = req.body;
  
  try {
    const result = await pool.query(
      `UPDATE events SET 
        title = $1, description = $2, date = $3, time = $4, 
        city = $5, venue = $6, image_url = $7, category_id = $8, 
        status = $9, organizer_id = $10
       WHERE id = $11 RETURNING *`,
      [title, description, date, time, city, venue, image_url, category_id, status, organizer_id, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/events/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM events WHERE id = $1', [id]);
    res.json({ message: 'Événement supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== USERS ====================
app.get('/api/admin/users', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        nom as name,
        email,
        role,
        created_at
      FROM users 
      ORDER BY created_at DESC
    `);
    console.log('✅ Utilisateurs trouvés:', result.rows.length);
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Erreur users:', err);
    res.json([]);
  }
});

app.get('/api/admin/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      SELECT 
        id,
        nom as name,
        email,
        role,
        created_at 
      FROM users WHERE id = $1
    `, [id]);
    
    if (result.rows[0]) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
  } catch (err) {
    console.error('Erreur user by id:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/admin/users', async (req, res) => {
  const { name, email, role, password_hash } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO users (nom, email, role, password_hash, created_at) 
       VALUES ($1, $2, $3, $4, NOW()) 
       RETURNING id, nom as name, email, role, created_at`,
      [name, email, role || 'user', password_hash || '$2b$10$default']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erreur creation user:', err);
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/admin/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users SET 
        nom = $1, 
        email = $2, 
        role = $3
       WHERE id = $4 
       RETURNING id, nom as name, email, role, created_at`,
      [name, email, role, id]
    );
    if (result.rows[0]) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
  } catch (err) {
    console.error('Erreur update user:', err);
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    if (result.rows[0]) {
      res.json({ message: 'Utilisateur supprimé', id: result.rows[0].id });
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
  } catch (err) {
    console.error('Erreur delete user:', err);
    res.status(500).json({ error: err.message });
  }
});

// ==================== ORGANIZERS ====================
app.get('/api/admin/organizers', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        u.id,
        u.nom as name,
        u.email,
        COUNT(e.id) as events_count
      FROM users u
      JOIN events e ON u.id = e.organizer_id
      GROUP BY u.id, u.nom, u.email
      ORDER BY events_count DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur organizers:', err);
    res.json([]);
  }
});

// ==================== ORDERS ====================
app.get('/api/admin/orders', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        o.id,
        o.id as order_number,
        u.nom as user_name,
        o.total_amount as amount,
        o.status,
        o.created_at
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur orders:', err);
    res.json([]);
  }
});

// ==================== STATS FOR CHARTS ====================
app.get('/api/admin/sales-stats', async (req, res) => {
  try {
    const { period } = req.query;
    let query = '';
    switch(period) {
      case '7j':
        query = `SELECT TO_CHAR(created_at, 'Dy') as name, COALESCE(SUM(total_amount), 0) as amount FROM orders WHERE created_at >= NOW() - INTERVAL '7 days' AND status = 'paid' GROUP BY TO_CHAR(created_at, 'Dy'), EXTRACT(DOW FROM created_at) ORDER BY EXTRACT(DOW FROM created_at)`;
        break;
      case '30j':
        query = `SELECT 'Semaine ' || CEIL(EXTRACT(DAY FROM created_at) / 7.0) as name, COALESCE(SUM(total_amount), 0) as amount FROM orders WHERE created_at >= NOW() - INTERVAL '30 days' AND status = 'paid' GROUP BY CEIL(EXTRACT(DAY FROM created_at) / 7.0) ORDER BY CEIL(EXTRACT(DAY FROM created_at) / 7.0)`;
        break;
      case '3m':
        query = `SELECT TO_CHAR(created_at, 'Mon') as name, COALESCE(SUM(total_amount), 0) as amount FROM orders WHERE created_at >= NOW() - INTERVAL '3 months' AND status = 'paid' GROUP BY TO_CHAR(created_at, 'Mon'), EXTRACT(MONTH FROM created_at) ORDER BY EXTRACT(MONTH FROM created_at)`;
        break;
      default:
        query = `SELECT TO_CHAR(created_at, 'Dy') as name, COALESCE(SUM(total_amount), 0) as amount FROM orders WHERE created_at >= NOW() - INTERVAL '7 days' AND status = 'paid' GROUP BY TO_CHAR(created_at, 'Dy'), EXTRACT(DOW FROM created_at) ORDER BY EXTRACT(DOW FROM created_at)`;
    }
    const result = await pool.query(query);
    res.json(result.rows.length ? result.rows : [{ name: 'Aucune', amount: 0 }]);
  } catch (err) {
    console.error('Erreur sales-stats:', err);
    res.json([{ name: 'Aucune', amount: 0 }]);
  }
});

app.get('/api/admin/category-stats', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        c.name,
        c.icon,
        c.color,
        COUNT(DISTINCT e.id) as events_count
      FROM categories c
      LEFT JOIN events e ON e.category_id = c.id
      GROUP BY c.id, c.name, c.icon, c.color
      ORDER BY events_count DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur category-stats:', err);
    res.json([]);
  }
});

// ==================== AUTH ====================
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1 AND role = $2', [email, 'admin']);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Accès non autorisé' });
    }
    const user = result.rows[0];
    user.name = user.nom;
    res.json({ token: 'fake-jwt-token', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur http://localhost:${PORT}`);
  console.log(`📊 API Admin: http://localhost:${PORT}/api/admin`);
});
