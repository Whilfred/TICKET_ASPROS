// const express = require('express');
// const router = express.Router();
// const { Pool } = require('pg');
// require('dotenv').config();

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });

// // ==================== DASHBOARD STATS ====================
// router.get('/stats', async (req, res) => {
//   try {
//     const userResult = await pool.query('SELECT COUNT(*) FROM users');
//     const evtResult = await pool.query('SELECT COUNT(*) FROM events');
//     const activeEventsResult = await pool.query("SELECT COUNT(*) FROM events WHERE status = 'published'");
//     const orderResult = await pool.query('SELECT COUNT(*) FROM sales');
//     const revenueResult = await pool.query("SELECT COALESCE(SUM(montant_total), 0) as total FROM sales WHERE payment_status = 'completed'");
    
//     res.json({
//       users: parseInt(userResult.rows[0].count) || 0,
//       events: parseInt(evtResult.rows[0].count) || 0,
//       activeEvents: parseInt(activeEventsResult.rows[0].count) || 0,
//       orders: parseInt(orderResult.rows[0].count) || 0,
//       revenue: parseInt(revenueResult.rows[0].total) || 0
//     });
//   } catch (err) {
//     console.error('Erreur stats:', err);
//     res.json({ users: 0, events: 0, activeEvents: 0, orders: 0, revenue: 0 });
//   }
// });

// // ==================== CATEGORIES ====================
// router.get('/categories', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM categories ORDER BY id');
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Erreur categories:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// router.post('/categories', async (req, res) => {
//   const { name, icon, color, is_active } = req.body;
//   try {
//     const result = await pool.query(
//       'INSERT INTO categories (name, icon, color, is_active) VALUES ($1, $2, $3, $4) RETURNING *',
//       [name, icon, color, is_active !== false]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.put('/categories/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, icon, color, is_active } = req.body;
//   try {
//     const result = await pool.query(
//       'UPDATE categories SET name = $1, icon = $2, color = $3, is_active = $4, updated_at = NOW() WHERE id = $5 RETURNING *',
//       [name, icon, color, is_active, id]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.delete('/categories/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const checkResult = await pool.query('SELECT COUNT(*) FROM events WHERE category_id = $1', [id]);
//     if (parseInt(checkResult.rows[0].count) > 0) {
//       return res.status(400).json({ error: 'Cette catégorie est utilisée par des événements' });
//     }
//     await pool.query('DELETE FROM categories WHERE id = $1', [id]);
//     res.json({ message: 'Catégorie supprimée' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ==================== EVENTS ====================
// router.get('/events', async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT 
//         e.*,
//         c.name as category_name,
//         c.icon as category_icon,
//         c.color as category_color,
//         COALESCE((SELECT SUM(quantite) FROM sales WHERE event_id = e.id AND payment_status = 'completed'), 0) as tickets_sold,
//         COALESCE((SELECT SUM(montant_total) FROM sales WHERE event_id = e.id AND payment_status = 'completed'), 0) as revenue
//       FROM events e
//       LEFT JOIN categories c ON e.category_id = c.id
//       ORDER BY e.date DESC
//     `);
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Erreur events:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// router.get('/events/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query(`
//       SELECT 
//         e.*,
//         c.name as category_name,
//         c.icon as category_icon,
//         c.color as category_color
//       FROM events e
//       LEFT JOIN categories c ON e.category_id = c.id
//       WHERE e.id = $1
//     `, [id]);
//     if (result.rows[0]) {
//       res.json(result.rows[0]);
//     } else {
//       res.status(404).json({ error: 'Événement non trouvé' });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.post('/events', async (req, res) => {
//   const { title, description, date, time, city, venue, price, image_url, category_id, status, publisher } = req.body;
//   const live = status === 'published';
  
//   try {
//     const result = await pool.query(
//       `INSERT INTO events (title, description, date, time, city, venue, price, image_url, category_id, publisher, status, live) 
//        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
//       [title, description, date, time, city, venue, price, image_url, category_id, publisher, status, live]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.put('/events/:id', async (req, res) => {
//   const { id } = req.params;
//   const { title, description, date, time, city, venue, price, image_url, category_id, status, publisher } = req.body;
//   const live = status === 'published';
  
//   try {
//     const result = await pool.query(
//       `UPDATE events SET title = $1, description = $2, date = $3, time = $4, 
//        city = $5, venue = $6, price = $7, image_url = $8, category_id = $9, 
//        publisher = $10, status = $11, live = $12, updated_at = NOW() 
//        WHERE id = $13 RETURNING *`,
//       [title, description, date, time, city, venue, price, image_url, category_id, publisher, status, live, id]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.delete('/events/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     await pool.query('DELETE FROM events WHERE id = $1', [id]);
//     res.json({ message: 'Événement supprimé' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ==================== USERS ====================
// router.get('/users', async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT 
//         id,
//         nom as name,
//         email,
//         phone,
//         address as city,
//         role,
//         is_active,
//         created_at
//       FROM users 
//       ORDER BY created_at DESC
//     `);
    
//     console.log('✅ Utilisateurs trouvés:', result.rows.length);
//     res.json(result.rows);
//   } catch (err) {
//     console.error('❌ Erreur users:', err);
//     res.json([]);
//   }
// });

// router.get('/users/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query(`
//       SELECT 
//         id,
//         nom as name,
//         email,
//         phone,
//         address as city,
//         role,
//         is_active,
//         created_at 
//       FROM users WHERE id = $1
//     `, [id]);
    
//     if (result.rows[0]) {
//       res.json(result.rows[0]);
//     } else {
//       res.status(404).json({ error: 'Utilisateur non trouvé' });
//     }
//   } catch (err) {
//     console.error('Erreur user by id:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// router.post('/users', async (req, res) => {
//   const { name, email, phone, city, role, password_hash } = req.body;
//   try {
//     const result = await pool.query(
//       `INSERT INTO users (nom, email, phone, address, role, password_hash, is_active, created_at) 
//        VALUES ($1, $2, $3, $4, $5, $6, true, NOW()) 
//        RETURNING id, nom as name, email, phone, address as city, role, created_at`,
//       [name, email, phone, city, role || 'customer', password_hash || '$2b$10$default']
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error('Erreur creation user:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// router.put('/users/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, email, phone, city, role, is_active } = req.body;
//   try {
//     const result = await pool.query(
//       `UPDATE users SET 
//         nom = $1, 
//         email = $2, 
//         phone = $3, 
//         address = $4, 
//         role = $5,
//         is_active = COALESCE($6, is_active),
//         updated_at = NOW() 
//        WHERE id = $7 
//        RETURNING id, nom as name, email, phone, address as city, role, is_active, created_at`,
//       [name, email, phone, city, role, is_active, id]
//     );
//     if (result.rows[0]) {
//       res.json(result.rows[0]);
//     } else {
//       res.status(404).json({ error: 'Utilisateur non trouvé' });
//     }
//   } catch (err) {
//     console.error('Erreur update user:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// router.delete('/users/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
//     if (result.rows[0]) {
//       res.json({ message: 'Utilisateur supprimé', id: result.rows[0].id });
//     } else {
//       res.status(404).json({ error: 'Utilisateur non trouvé' });
//     }
//   } catch (err) {
//     console.error('Erreur delete user:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // ==================== ORGANIZERS ====================
// router.get('/organizers', async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT 
//         u.id,
//         u.nom as name,
//         u.email,
//         u.phone,
//         COUNT(e.id) as events_count,
//         COALESCE(SUM(s.montant_total), 0) as total_revenue,
//         COALESCE(SUM(s.quantite), 0) as total_tickets_sold
//       FROM users u
//       LEFT JOIN events e ON u.id = e.organizer_id
//       LEFT JOIN sales s ON e.id = s.event_id AND s.payment_status = 'completed'
//       GROUP BY u.id, u.nom, u.email, u.phone
//       HAVING COUNT(e.id) > 0
//       ORDER BY events_count DESC
//     `);
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Erreur organizers:', err);
//     res.json([]);
//   }
// });

// // ==================== ORDERS ====================
// router.get('/orders', async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT 
//         s.id,
//         s.order_number,
//         s.buyer_name as user_name,
//         e.title as event_title,
//         s.montant_total as amount,
//         s.payment_status as status,
//         s.quantite,
//         s.created_at
//       FROM sales s
//       LEFT JOIN events e ON s.event_id = e.id
//       ORDER BY s.created_at DESC
//     `);
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Erreur orders:', err);
//     res.json([]);
//   }
// });

// // ==================== STATS FOR CHARTS ====================
// router.get('/sales-stats', async (req, res) => {
//   try {
//     const { period } = req.query;
//     let query = '';
//     switch(period) {
//       case '7j':
//         query = `SELECT TO_CHAR(created_at, 'Dy') as name, COALESCE(SUM(montant_total), 0) as amount FROM sales WHERE created_at >= NOW() - INTERVAL '7 days' AND payment_status = 'completed' GROUP BY TO_CHAR(created_at, 'Dy'), EXTRACT(DOW FROM created_at) ORDER BY EXTRACT(DOW FROM created_at)`;
//         break;
//       case '30j':
//         query = `SELECT 'Semaine ' || CEIL(EXTRACT(DAY FROM created_at) / 7.0) as name, COALESCE(SUM(montant_total), 0) as amount FROM sales WHERE created_at >= NOW() - INTERVAL '30 days' AND payment_status = 'completed' GROUP BY CEIL(EXTRACT(DAY FROM created_at) / 7.0) ORDER BY CEIL(EXTRACT(DAY FROM created_at) / 7.0)`;
//         break;
//       case '3m':
//         query = `SELECT TO_CHAR(created_at, 'Mon') as name, COALESCE(SUM(montant_total), 0) as amount FROM sales WHERE created_at >= NOW() - INTERVAL '3 months' AND payment_status = 'completed' GROUP BY TO_CHAR(created_at, 'Mon'), EXTRACT(MONTH FROM created_at) ORDER BY EXTRACT(MONTH FROM created_at)`;
//         break;
//       default:
//         query = `SELECT TO_CHAR(created_at, 'Dy') as name, COALESCE(SUM(montant_total), 0) as amount FROM sales WHERE created_at >= NOW() - INTERVAL '7 days' AND payment_status = 'completed' GROUP BY TO_CHAR(created_at, 'Dy'), EXTRACT(DOW FROM created_at) ORDER BY EXTRACT(DOW FROM created_at)`;
//     }
//     const result = await pool.query(query);
//     res.json(result.rows.length ? result.rows : [{ name: 'Aucune', amount: 0 }]);
//   } catch (err) {
//     console.error('Erreur sales-stats:', err);
//     res.json([{ name: 'Aucune', amount: 0 }]);
//   }
// });

// router.get('/category-stats', async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT 
//         c.name,
//         c.icon,
//         c.color,
//         c.is_active,
//         COUNT(DISTINCT e.id) as events_count,
//         COALESCE(SUM(s.montant_total), 0) as revenue
//       FROM categories c
//       LEFT JOIN events e ON e.category_id = c.id
//       LEFT JOIN sales s ON s.event_id = e.id AND s.payment_status = 'completed'
//       GROUP BY c.id, c.name, c.icon, c.color, c.is_active
//       ORDER BY events_count DESC
//     `);
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Erreur category-stats:', err);
//     res.json([]);
//   }
// });

// // ==================== AUTH ====================
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const result = await pool.query('SELECT * FROM users WHERE email = $1 AND role = $2 AND is_active = true', [email, 'admin']);
//     if (result.rows.length === 0) {
//       return res.status(401).json({ error: 'Accès non autorisé' });
//     }
//     const user = result.rows[0];
//     user.name = user.nom;
//     res.json({ token: 'fake-jwt-token', user });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;