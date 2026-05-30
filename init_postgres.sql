-- =====================================================
-- BASE DE DONNÉES TICKETASPROS
-- Structure finale complète
-- =====================================================

-- Suppression des tables existantes (pour réinitialisation)
DROP TABLE IF EXISTS tickets CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS ticket_types CASCADE;
DROP TABLE IF EXISTS event_prices CASCADE;
DROP TABLE IF EXISTS event_likes CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS wallets CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- =====================================================
-- TABLE USERS
-- =====================================================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);

-- =====================================================
-- TABLE CATEGORIES
-- =====================================================
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(50),
    color VARCHAR(7) DEFAULT '#1a6cf0',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLE EVENTS
-- =====================================================
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    image_url TEXT,
    category VARCHAR(100),
    city VARCHAR(100),
    date DATE NOT NULL,
    time TIME,
    venue VARCHAR(200),
    organizer_id INTEGER REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT NOW(),
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL
);

CREATE INDEX idx_events_category_id ON events(category_id);
CREATE INDEX idx_events_date ON events(date);

-- =====================================================
-- TABLE EVENT LIKES
-- =====================================================
CREATE TABLE event_likes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, event_id)
);

CREATE INDEX idx_event_likes_user ON event_likes(user_id);
CREATE INDEX idx_event_likes_event ON event_likes(event_id);

-- =====================================================
-- TABLE EVENT PRICES
-- =====================================================
CREATE TABLE event_prices (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    name VARCHAR(100),
    amount INTEGER
);

-- =====================================================
-- TABLE TICKET TYPES
-- =====================================================
CREATE TABLE ticket_types (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    quantity_total INTEGER NOT NULL,
    quantity_sold INTEGER DEFAULT 0
);

-- =====================================================
-- TABLE ORDERS
-- =====================================================
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    event_id INTEGER REFERENCES events(id),
    total_amount NUMERIC(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    payment_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_event ON orders(event_id);
CREATE INDEX idx_orders_status ON orders(status);

-- =====================================================
-- TABLE ORDER ITEMS
-- =====================================================
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    ticket_type_id INTEGER REFERENCES ticket_types(id),
    quantity INTEGER NOT NULL,
    unit_price NUMERIC(10,2) NOT NULL
);

-- =====================================================
-- TABLE TICKETS
-- =====================================================
CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    ticket_type_id INTEGER REFERENCES ticket_types(id),
    qr_code_token UUID DEFAULT gen_random_uuid() UNIQUE,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- TABLE SUBSCRIPTIONS
-- =====================================================
CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    organizer_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, organizer_name)
);

-- =====================================================
-- TABLE NOTIFICATIONS
-- =====================================================
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    type VARCHAR(50),
    message TEXT,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);

-- =====================================================
-- TABLE WALLETS
-- =====================================================
CREATE TABLE wallets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) UNIQUE,
    balance NUMERIC(10,2) DEFAULT 0
);





















-- =====================================================
-- DONNÉES DE TEST
-- =====================================================

-- Insertion des catégories
INSERT INTO categories (name, icon, color) VALUES 
('Concerts', '🎵', '#e11d48'),
('Festivals', '🎪', '#7c3aed'),
('Theatre', '🎭', '#2563eb'),
('Sport', '⚽', '#16a34a'),
('Conferences', '🎤', '#0891b2'),
('Culture', '🎨', '#f59e0b'),
('Tourisme', '✈️', '#06b6d4');

-- Insertion des utilisateurs
INSERT INTO users (nom, email, password_hash, role) VALUES 
('Admin Principal', 'admin@ticketaspros.com', '$2b$10$encodedhash', 'admin'),
('Aminata Ouedraogo', 'aminata@gmail.com', '$2b$10$encodedhash', 'user'),
('Moussa Kabore', 'moussa@yahoo.fr', '$2b$10$encodedhash', 'user'),
('Fatima Traore', 'fatima@outlook.com', '$2b$10$encodedhash', 'user'),
('Issouf Sawadogo', 'issouf@gmail.com', '$2b$10$encodedhash', 'user'),
('Mariam Compaore', 'mariam@gmail.com', '$2b$10$encodedhash', 'user');

-- Insertion des événements
INSERT INTO events (title, description, date, time, city, venue, image_url, category_id, status, organizer_id) VALUES 
('Fally Ipupa Live', 'Grand concert afrobeats', '2026-06-15', '20:00:00', 'Ouagadougou', 'Stade Municipal', 'https://example.com/fally.jpg', 1, 'published', 1),
('Festival du Sahel', 'Festival culturel annuel', '2026-07-20', '18:00:00', 'Bobo-Dioulasso', 'CITO', 'https://example.com/sahel.jpg', 2, 'published', 1),
('Soiree Afrobeat', 'Soiree dansante', '2026-08-05', '22:00:00', 'Ouagadougou', 'Bar Le Verdoyant', 'https://example.com/afrobeat.jpg', 1, 'draft', 2),
('Match finale ligue', 'Finale championnat national', '2026-06-30', '16:00:00', 'Koudougou', 'Stade de Koudougou', 'https://example.com/foot.jpg', 4, 'published', 3),
('Conference Tech BF', 'Tech & Innovation', '2026-09-10', '14:00:00', 'Ouagadougou', 'Hotel Laico', 'https://example.com/tech.jpg', 5, 'published', 4),
('Theatre National', 'Piece de theatre moderne', '2026-07-15', '19:30:00', 'Ouagadougou', 'CCFB', 'https://example.com/theatre.jpg', 3, 'published', 2),
('Salon Gastronomie', 'Festival culinaire', '2026-10-15', '10:00:00', 'Ouagadougou', 'SIAO', 'https://example.com/gastro.jpg', 6, 'published', 5),
('FESPACO 2027', 'Festival du cinema', '2027-02-25', '09:00:00', 'Ouagadougou', 'Cinema Burkina', 'https://example.com/cinema.jpg', 2, 'published', 1);

-- Insertion des types de billets
INSERT INTO ticket_types (event_id, name, price, quantity_total, quantity_sold) VALUES 
(1, 'Standard', 15000, 500, 45),
(1, 'VIP', 30000, 50, 12),
(2, 'Normal', 8000, 1000, 28),
(2, 'Premium', 15000, 200, 8),
(4, 'Tribune', 2000, 800, 23),
(5, 'Standard', 10000, 300, 35),
(5, 'VIP', 25000, 50, 7),
(6, 'Normal', 3000, 200, 12),
(7, 'Entree', 2500, 500, 15),
(8, 'Standard', 5000, 1000, 28);

-- Insertion des commandes
INSERT INTO orders (user_id, event_id, total_amount, status, payment_method, created_at) VALUES 
(2, 1, 30000, 'paid', 'Orange Money', NOW() - INTERVAL '2 days'),
(3, 1, 15000, 'paid', 'Wave', NOW() - INTERVAL '1 day'),
(4, 2, 24000, 'paid', 'MTN Mobile', NOW() - INTERVAL '3 days'),
(2, 5, 20000, 'paid', 'Orange Money', NOW() - INTERVAL '5 days'),
(5, 4, 8000, 'pending', 'Wave', NOW()),
(3, 5, 25000, 'paid', 'MTN Mobile', NOW() - INTERVAL '4 days'),
(6, 2, 16000, 'paid', 'Orange Money', NOW() - INTERVAL '6 days'),
(2, 8, 10000, 'paid', 'Wave', NOW() - INTERVAL '7 days');

-- Insertion des likes
INSERT INTO event_likes (user_id, event_id) VALUES 
(2, 1), (3, 1), (4, 1), (5, 1),
(2, 2), (3, 2), (6, 2),
(2, 5), (4, 5);

-- Insertion des abonnements
INSERT INTO subscriptions (user_id, organizer_name) VALUES 
(2, 'Aziz Productions'),
(3, 'Aziz Productions'),
(4, 'Culture Burkina'),
(5, 'EventPro BF');

-- Insertion des notifications
INSERT INTO notifications (user_id, type, message) VALUES 
(2, 'info', 'Nouvel evenement ajoute'),
(3, 'success', 'Votre commande est confirmee'),
(4, 'promo', 'Promotion sur les billets'),
(2, 'reminder', 'Le concert approche');

-- Insertion des portefeuilles
INSERT INTO wallets (user_id, balance) VALUES 
(1, 0), (2, 15000), (3, 5000), (4, 2000), (5, 1000), (6, 0);

-- =====================================================
-- VÉRIFICATION FINALE
-- =====================================================
SELECT '=== STATISTIQUES ===' as info;
SELECT 'Utilisateurs: ' || COUNT(*) FROM users;
SELECT 'Categories: ' || COUNT(*) FROM categories;
SELECT 'Evenements: ' || COUNT(*) FROM events;
SELECT 'Commandes: ' || COUNT(*) FROM orders;
SELECT 'Ventes totales: ' || COALESCE(SUM(total_amount), 0) || ' FCFA' FROM orders WHERE status = 'paid';
SELECT 'Likes: ' || COUNT(*) FROM event_likes;
SELECT 'Abonnements: ' || COUNT(*) FROM subscriptions;
SELECT 'Notifications: ' || COUNT(*) FROM notifications;