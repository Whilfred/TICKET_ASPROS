-- =====================================================
-- TICKETASPROS - Base de données PostgreSQL
-- =====================================================

-- Suppression des tables existantes (pour réinitialisation)
DROP TABLE IF EXISTS event_likes CASCADE;
DROP TABLE IF EXISTS event_prices CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- =====================================================
-- Création des tables
-- =====================================================

-- Table des catégories
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  icon VARCHAR(50),
  color VARCHAR(7) DEFAULT '#1a6cf0',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des événements
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  full_description TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location VARCHAR(255),
  venue VARCHAR(255),
  price VARCHAR(100),
  image_url VARCHAR(500),
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  publisher VARCHAR(255),
  verified BOOLEAN DEFAULT FALSE,
  live BOOLEAN DEFAULT FALSE,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des prix
CREATE TABLE event_prices (
  id SERIAL PRIMARY KEY,
  event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name VARCHAR(100),
  amount INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des utilisateurs
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  city VARCHAR(100),
  avatar_url VARCHAR(500),
  is_admin BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des likes
CREATE TABLE event_likes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, event_id)
);

-- Table des abonnements
CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  organizer_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, organizer_name)
);

-- Table des notifications
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'info',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- Index pour les performances
-- =====================================================

CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_category_id ON events(category_id);
CREATE INDEX idx_events_location ON events(location);
CREATE INDEX idx_events_live ON events(live);
CREATE INDEX idx_events_verified ON events(verified);

CREATE INDEX idx_event_prices_event ON event_prices(event_id);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_is_admin ON users(is_admin);

CREATE INDEX idx_event_likes_user ON event_likes(user_id);
CREATE INDEX idx_event_likes_event ON event_likes(event_id);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

-- =====================================================
-- Fonction et triggers pour updated_at
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- =====================================================
-- Tables supplémentaires pour la billetterie coté promoteurs
-- =====================================================

-- Table des promoteurs (profil complet)
CREATE TABLE promoters (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  company_name VARCHAR(255),
  logo_url VARCHAR(500),
  address TEXT,
  phone_2 VARCHAR(20),
  payment_method VARCHAR(50),
  payment_account VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des types de billets
CREATE TABLE ticket_types (
  id SERIAL PRIMARY KEY,
  event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  nom VARCHAR(100) NOT NULL,
  prix INTEGER NOT NULL DEFAULT 0,
  quantite_totale INTEGER NOT NULL,
  quantite_vendue INTEGER DEFAULT 0,
  max_par_commande INTEGER DEFAULT 10,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des ventes (commandes)
CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  event_id INTEGER NOT NULL REFERENCES events(id),
  ticket_type_id INTEGER NOT NULL REFERENCES ticket_types(id),
  buyer_name VARCHAR(100) NOT NULL,
  buyer_email VARCHAR(100) NOT NULL,
  buyer_phone VARCHAR(20),
  quantite INTEGER NOT NULL DEFAULT 1,
  montant_total INTEGER NOT NULL,
  commission INTEGER NOT NULL,
  net_promoteur INTEGER NOT NULL,
  payment_status VARCHAR(20) DEFAULT 'pending',
  transaction_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des tickets individuels (lien avec MongoDB)
CREATE TABLE tickets (
  id SERIAL PRIMARY KEY,
  sale_id INTEGER NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
  ticket_type_id INTEGER NOT NULL REFERENCES ticket_types(id),
  event_id INTEGER NOT NULL REFERENCES events(id),
  ticket_code VARCHAR(50) UNIQUE NOT NULL,
  mongo_id VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des reversements
CREATE TABLE payouts (
  id SERIAL PRIMARY KEY,
  promoter_id INTEGER NOT NULL REFERENCES promoters(id) ON DELETE CASCADE,
  event_id INTEGER REFERENCES events(id) ON DELETE SET NULL,
  amount INTEGER NOT NULL,
  commission_total INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  payment_method VARCHAR(50),
  transaction_id VARCHAR(100),
  requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

-- =====================================================
-- Index supplémentaires
-- =====================================================

CREATE INDEX idx_promoters_user_id ON promoters(user_id);
CREATE INDEX idx_ticket_types_event_id ON ticket_types(event_id);
CREATE INDEX idx_sales_event_id ON sales(event_id);
CREATE INDEX idx_sales_user_id ON sales(user_id);
CREATE INDEX idx_sales_order_number ON sales(order_number);
CREATE INDEX idx_tickets_ticket_code ON tickets(ticket_code);
CREATE INDEX idx_tickets_event_id ON tickets(event_id);
CREATE INDEX idx_payouts_promoter_id ON payouts(promoter_id);

-- =====================================================
-- Triggers pour promoters
-- =====================================================

CREATE TRIGGER update_promoters_updated_at BEFORE UPDATE ON promoters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ticket_types_updated_at BEFORE UPDATE ON ticket_types
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

