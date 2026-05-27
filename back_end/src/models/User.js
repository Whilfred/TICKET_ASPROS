const db = require('../config/database');
const bcrypt = require('bcryptjs');

const User = {
  // Créer un utilisateur
  create: async (userData) => {
    const { name, email, password, phone, city } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO users (name, email, password, phone, city) VALUES (?, ?, ?, ?, ?)`,
        [name, email, hashedPassword, phone, city],
        function(err) {
          if (err) reject(err);
          resolve({ id: this.lastID, name, email, phone, city });
        }
      );
    });
  },

  // Trouver par email
  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  },

  // Trouver par ID
  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT id, name, email, phone, city, is_admin, created_at FROM users WHERE id = ?`, [id], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  },

  // Vérifier le mot de passe
  verifyPassword: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  }
};

module.exports = User;