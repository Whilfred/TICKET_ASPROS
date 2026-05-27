const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEvent);
router.post('/', auth, upload.single('image'), eventController.createEvent);
router.post('/:id/like', auth, eventController.likeEvent);

module.exports = router;