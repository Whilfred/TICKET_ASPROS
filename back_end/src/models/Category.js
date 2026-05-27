const db = require('../config/database');

const Category = {
  // Récupérer toutes les catégories
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM categories ORDER BY name`, (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  },

  // Récupérer une catégorie par ID
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM categories WHERE id = ?`, [id], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  },

  // Créer une catégorie
  create: (category) => {
    return new Promise((resolve, reject) => {
      const { name, icon, color } = category;
      db.run(
        `INSERT INTO categories (name, icon, color) VALUES (?, ?, ?)`,
        [name, icon, color],
        function(err) {
          if (err) reject(err);
          resolve({ id: this.lastID, ...category });
        }
      );
    });
  },

  // Mettre à jour une catégorie
  update: (id, category) => {
    return new Promise((resolve, reject) => {
      const { name, icon, color } = category;
      db.run(
        `UPDATE categories SET name = ?, icon = ?, color = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        [name, icon, color, id],
        function(err) {
          if (err) reject(err);
          resolve({ id, ...category });
        }
      );
    });
  },

  // Supprimer une catégorie
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM categories WHERE id = ?`, [id], function(err) {
        if (err) reject(err);
        resolve({ deleted: true });
      });
    });
  }
};

module.exports = Category;