const Event = require('../models/Event');

// Récupérer tous les événements
exports.getAllEvents = async (req, res) => {
  try {
    const { category, search, live } = req.query;
    const events = await Event.getAll({ category, search, live });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer un événement
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.getById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Événement non trouvé' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer un événement
exports.createEvent = async (req, res) => {
  try {
    const { title, description, full_description, date, time, location, venue, price, category_id, publisher, verified, live, prices } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    
    const event = await Event.create({
      title, description, full_description, date, time, location, venue,
      price, image_url, category_id, publisher, verified, live
    }, prices ? JSON.parse(prices) : []);
    
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ajouter un like
exports.likeEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const eventId = req.params.id;
    
    const hasLiked = await Event.hasLiked(eventId, userId);
    
    if (hasLiked) {
      await Event.removeLike(eventId, userId);
      res.json({ liked: false, likes: await Event.getLikesCount(eventId) });
    } else {
      await Event.addLike(eventId, userId);
      res.json({ liked: true, likes: await Event.getLikesCount(eventId) });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};