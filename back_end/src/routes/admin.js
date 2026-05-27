const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// ==================== DASHBOARD STATS ====================
router.get('/stats', async (req, res) => {
  try {
    // Compter les catégories
    const catResult = await pool.query('SELECT COUNT(*) FROM categories');
    const categories = parseInt(catResult.rows[0].count) || 0;
    
    // Compter les événements
    const evtResult = await pool.query('SELECT COUNT(*) FROM events');
    const events = parseInt(evtResult.rows[0].count) || 0;
    
    // Compter les utilisateurs
    const userResult = await pool.query('SELECT COUNT(*) FROM users');
    const users = parseInt(userResult.rows[0].count) || 0;
    
    // Compter les commandes
    const orderResult = await pool.query('SELECT COUNT(*) FROM orders');
    const orders = parseInt(orderResult.rows[0].count) || 0;
    
    // Calculer les revenus (utilisation de total_amount)
    const revenueResult = await pool.query("SELECT COALESCE(SUM(total_amount), 0) as total FROM orders WHERE status = 'completed'");
    const revenue = parseInt(revenueResult.rows[0].total) || 0;
    
    console.log('Stats:', { categories, events, users, orders, revenue });
    
    res.json({
      categories,
      events,
      users,
      orders,
      revenue
    });
  } catch (err) {
    console.error('Erreur stats:', err);
    res.json({
      categories: 0,
      events: 0,
      users: 0,
      orders: 0,
      revenue: 0
    });
  }
});

// ==================== CATEGORIES ====================
router.get('/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/categories', async (req, res) => {
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

router.put('/categories/:id', async (req, res) => {
  const { id } = req.params;
  const { name, icon, color } = req.body;
  try {
    const result = await pool.query(
      'UPDATE categories SET name = $1, icon = $2, color = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
      [name, icon, color, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/categories/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM categories WHERE id = $1', [id]);
    res.json({ message: 'Catégorie supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== EVENTS ====================
router.get('/events', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.*, c.name as category_name, c.icon as category_icon, c.color as category_color,
      (SELECT COUNT(*) FROM orders WHERE event_id = e.id) as tickets_sold
      FROM events e
      LEFT JOIN categories c ON e.category_id = c.id
      ORDER BY e.date DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/events/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      SELECT e.*, c.name as category_name, c.icon as category_icon
      FROM events e
      LEFT JOIN categories c ON e.category_id = c.id
      WHERE e.id = $1
    `, [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/events', async (req, res) => {
  const { title, description, date, time, city, venue, price, image_url, category_id, status, full_description } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO events (title, description, full_description, date, time, city, venue, price, image_url, category_id, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [title, description, full_description, date, time, city, venue, price, image_url, category_id, status || 'draft']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/events/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, full_description, date, time, city, venue, price, image_url, category_id, status } = req.body;
  try {
    const result = await pool.query(
      `UPDATE events SET title = $1, description = $2, full_description = $3, date = $4, time = $5, 
       city = $6, venue = $7, price = $8, image_url = $9, category_id = $10, status = $11, updated_at = NOW() 
       WHERE id = $12 RETURNING *`,
      [title, description, full_description, date, time, city, venue, price, image_url, category_id, status, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/events/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM events WHERE id = $1', [id]);
    res.json({ message: 'Événement supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== USERS ====================
router.get('/users', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        nom as name,
        email,
        role as is_admin,
        created_at,
        CASE WHEN role = 'admin' THEN true ELSE false END as is_admin_flag
      FROM users 
      ORDER BY created_at DESC
    `);
    res.json(result.rows || []);
  } catch (err) {
    console.error('Erreur users:', err);
    res.json([]);
  }
});

router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users SET nom = $1, email = $2, role = $3, updated_at = NOW() 
       WHERE id = $4 RETURNING *`,
      [name, email, role, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      SELECT id, name, email, phone, city, is_admin, is_verified, created_at 
      FROM users WHERE id = $1
    `, [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, city, is_admin, is_verified } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users SET name = $1, email = $2, phone = $3, city = $4, is_admin = $5, is_verified = $6, updated_at = NOW() 
       WHERE id = $7 RETURNING *`,
      [name, email, phone, city, is_admin, is_verified, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== ORGANIZERS (PROMOTEURS) ====================
router.get('/organizers', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT publisher as name, COUNT(*) as events_count,
      SUM(likes) as total_likes
      FROM events 
      WHERE publisher IS NOT NULL 
      GROUP BY publisher 
      ORDER BY events_count DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== ORDERS ====================
router.get('/orders', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT o.*, e.title as event_title, u.name as user_name 
      FROM orders o
      LEFT JOIN events e ON o.event_id = e.id
      LEFT JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== AUTH ====================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1 AND is_admin = true', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Accès non autorisé' });
    }
    // Pour le test, on accepte n'importe quel mot de passe (à remplacer par bcrypt)
    res.json({ token: 'fake-jwt-token', user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
