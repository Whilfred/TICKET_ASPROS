const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configuration PostgreSQL avec .env
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test de connexion
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Erreur de connexion à PostgreSQL:', err.stack);
  } else {
    console.log('✅ Connecté à PostgreSQL');
    release();
  }
});

const adminRoutes = require('./routes/admin');

// Routes API
app.get('/api/test', (req, res) => {
  res.json({ message: 'API fonctionne ! 🚀', timestamp: new Date() });
});

app.get('/api/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = `
      SELECT e.*, c.name as category_name, c.color as category_color 
      FROM events e
      LEFT JOIN categories c ON e.category_id = c.id
      WHERE e.status = 'published'
    `;
    const params = [];
    
    if (category) {
      query += ` AND e.category_id = $${params.length + 1}`;
      params.push(category);
    }
    
    if (search) {
      query += ` AND (e.title ILIKE $${params.length + 1} OR e.city ILIKE $${params.length + 1})`;
      params.push(`%${search}%`);
    }
    
    query += ` ORDER BY e.date ASC`;
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT e.*, c.name as category_name, c.color as category_color 
       FROM events e
       LEFT JOIN categories c ON e.category_id = c.id
       WHERE e.id = $1`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Événement non trouvé' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.use('/api/admin', adminRoutes);


// Route 404
app.use('*', (req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.url} non trouvée` });
});

module.exports = app;