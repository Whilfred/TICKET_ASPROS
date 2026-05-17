//require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

require('./db');

app.use('/api/auth', require('./routes/auth.routes'));

app.get('/', (req, res) => {
  res.json({ message: 'API ASPROS Billetterie 🎟️' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});