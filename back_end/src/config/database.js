const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Créer le dossier data
const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Initialisation des tables
const initDatabase = () => {
  // Table des catégories
  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(100) NOT NULL,
      icon VARCHAR(50),
      color VARCHAR(7) DEFAULT '#1a6cf0',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Table des événements
  db.run(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      full_description TEXT,
      date DATE NOT NULL,
      time TIME NOT NULL,
      location VARCHAR(255),
      venue VARCHAR(255),
      price VARCHAR(100),
      image_url VARCHAR(500),
      category_id INTEGER,
      publisher VARCHAR(255),
      verified BOOLEAN DEFAULT 0,
      live BOOLEAN DEFAULT 0,
      likes INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    )
  `);

  // Table des prix
  db.run(`
    CREATE TABLE IF NOT EXISTS event_prices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id INTEGER,
      name VARCHAR(100),
      amount INTEGER,
      FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
    )
  `);

  // Table des utilisateurs
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      city VARCHAR(100),
      is_admin BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Table des likes
  db.run(`
    CREATE TABLE IF NOT EXISTS event_likes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      event_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
      UNIQUE(user_id, event_id)
    )
  `);

  // Insérer des catégories par défaut
  const defaultCategories = [
    { name: 'Concert', icon: '🎵', color: '#1a6cf0' },
    { name: 'Culture', icon: '🎨', color: '#7c3aed' },
    { name: 'Formation', icon: '🎓', color: '#f59e0b' },
    { name: 'Soirée', icon: '🍸', color: '#0891b2' },
    { name: 'Tourisme', icon: '✈️', color: '#10b981' },
    { name: 'Sport', icon: '⚽', color: '#ef4444' },
    { name: 'Festival', icon: '🏖️', color: '#ec4899' }
  ];

  defaultCategories.forEach(cat => {
    db.run(
      `INSERT OR IGNORE INTO categories (name, icon, color) VALUES (?, ?, ?)`,
      [cat.name, cat.icon, cat.color]
    );
  });

  console.log('✅ Base de données initialisée');
};

initDatabase();

module.exports = db;