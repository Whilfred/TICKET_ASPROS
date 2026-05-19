const pool = require('../db');

const getEvents = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        e.id,
        e.title,
        e.description,
        e.image_url,
        e.category,
        e.city,
        e.date,
        e.time,
        e.venue,
        e.status,
        u.nom AS organisateur_nom,
        MIN(tt.price) AS prix_min
      FROM events e
      LEFT JOIN users u ON e.organizer_id = u.id
      LEFT JOIN ticket_types tt ON tt.event_id = e.id
      GROUP BY e.id, u.nom
      ORDER BY e.date ASC
    `);

    res.json({ events: result.rows });

  } catch (err) {
    console.error('Erreur getEvents :', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const createEvent = async (req, res) => {
  const {
    title,
    description,
    image_url,
    category,
    city,
    date,
    time,
    venue,
    organizer_id,
    ticket_types
  } = req.body;

  if (!title || !date || !city || !organizer_id) {
    return res.status(400).json({ message: 'Champs obligatoires manquants' });
  }

  try {

    const result = await pool.query(
      `INSERT INTO events (title, description, image_url, category, city, date, time, venue, organizer_id, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'published')
       RETURNING *`,
      [title, description, image_url, category, city, date, time, venue, organizer_id]
    );

    const event = result.rows[0];

    if (ticket_types && ticket_types.length > 0) {
      for (const ticket of ticket_types) {
        await pool.query(
          `INSERT INTO ticket_types (event_id, name, price, quantity_total)
           VALUES ($1, $2, $3, $4)`,
          [event.id, ticket.name, ticket.price, ticket.quantity_total]
        );
      }
    }

    res.status(201).json({ message: 'Événement créé avec succès', event });

  } catch (err) {
    console.error('Erreur createEvent :', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { getEvents, createEvent };
