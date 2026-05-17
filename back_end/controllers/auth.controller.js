const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const register = async (req, res) => {
  const { nom, email, password, role } = req.body;

  if (!nom || !email || !password) {
    return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
  }

  try {
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ message: 'Email déjà utilisé' });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (nom, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, nom, email, role',
      [nom, email, password_hash, role || 'user']
    );

    const user = result.rows[0];

    await pool.query('INSERT INTO wallets (user_id) VALUES ($1)', [user.id]);

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({ message: 'Compte créé avec succès', token, user });

  } catch (err) {
    console.error('Erreur register :', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe obligatoires' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      message: 'Connexion réussie',
      token,
      user: { id: user.id, nom: user.nom, email: user.email, role: user.role }
    });

  } catch (err) {
    console.error('Erreur login :', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { register, login };