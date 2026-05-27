const db = require('../config/database');

const Event = {
  // Récupérer tous les événements avec filtres
  getAll: (filters = {}) => {
    return new Promise((resolve, reject) => {
      let query = `
        SELECT e.*, c.name as category_name, c.color as category_color 
        FROM events e
        LEFT JOIN categories c ON e.category_id = c.id
        WHERE 1=1
      `;
      const params = [];

      if (filters.category) {
        query += ` AND c.id = ?`;
        params.push(filters.category);
      }

      if (filters.search) {
        query += ` AND (e.title LIKE ? OR e.location LIKE ?)`;
        params.push(`%${filters.search}%`, `%${filters.search}%`);
      }

      if (filters.live === 'true') {
        query += ` AND e.live = 1`;
      }

      query += ` ORDER BY e.date ASC`;

      db.all(query, params, (err, rows) => {
        if (err) reject(err);
        
        // Récupérer les prix pour chaque événement
        const promises = rows.map(async (event) => {
          const prices = await Event.getPrices(event.id);
          return { ...event, prices };
        });
        
        Promise.all(promises).then(resolve).catch(reject);
      });
    });
  },

  // Récupérer les prix d'un événement
  getPrices: (eventId) => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM event_prices WHERE event_id = ?`, [eventId], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  },

  // Récupérer un événement par ID
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(`
        SELECT e.*, c.name as category_name, c.color as category_color 
        FROM events e
        LEFT JOIN categories c ON e.category_id = c.id
        WHERE e.id = ?
      `, [id], async (err, row) => {
        if (err) reject(err);
        if (row) {
          row.prices = await Event.getPrices(id);
        }
        resolve(row);
      });
    });
  },

  // Créer un événement
  create: (event, prices = []) => {
    return new Promise((resolve, reject) => {
      const { title, description, full_description, date, time, location, venue, price, image_url, category_id, publisher, verified, live } = event;
      
      db.run(`
        INSERT INTO events (
          title, description, full_description, date, time, location, venue, 
          price, image_url, category_id, publisher, verified, live
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [title, description, full_description, date, time, location, venue, price, image_url, category_id, publisher, verified || 0, live || 0], 
      function(err) {
        if (err) reject(err);
        
        const eventId = this.lastID;
        
        // Insérer les prix
        const pricePromises = prices.map(p => {
          return new Promise((resolvePrice, rejectPrice) => {
            db.run(
              `INSERT INTO event_prices (event_id, name, amount) VALUES (?, ?, ?)`,
              [eventId, p.name, p.amount],
              (err) => {
                if (err) rejectPrice(err);
                resolvePrice();
              }
            );
          });
        });
        
        Promise.all(pricePromises)
          .then(() => resolve({ id: eventId, ...event }))
          .catch(reject);
      });
    });
  },

  // Ajouter un like
  addLike: (eventId, userId) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO event_likes (user_id, event_id) VALUES (?, ?)`,
        [userId, eventId],
        (err) => {
          if (err) reject(err);
          db.run(`UPDATE events SET likes = likes + 1 WHERE id = ?`, [eventId]);
          resolve({ liked: true });
        }
      );
    });
  },

  // Supprimer un like
  removeLike: (eventId, userId) => {
    return new Promise((resolve, reject) => {
      db.run(
        `DELETE FROM event_likes WHERE user_id = ? AND event_id = ?`,
        [userId, eventId],
        (err) => {
          if (err) reject(err);
          db.run(`UPDATE events SET likes = likes - 1 WHERE id = ?`, [eventId]);
          resolve({ liked: false });
        }
      );
    });
  },

  // Vérifier si l'utilisateur a liké
  hasLiked: (eventId, userId) => {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT 1 FROM event_likes WHERE user_id = ? AND event_id = ?`,
        [userId, eventId],
        (err, row) => {
          if (err) reject(err);
          resolve(!!row);
        }
      );
    });
  }
};

module.exports = Event;