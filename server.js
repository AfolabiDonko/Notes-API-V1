const express = require('express');
const cors = require('cors');
const db = require('./models');

const app = express();
require('dotenv').config(); // Charger les variables d'environnement

const corsOptions = {
  origin: ['http://localhost:8091', 'http://localhost:8092'], // les clients web et mobile
};
app.use(cors(corsOptions));
// les middlewares d'analyse du corps de la requête (définir avant les routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// definissions des routes
require('./routes/user.routes')(app);
require('./routes/note.routes')(app);
// Connexion à la base de données
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });
app.get('/', (req, res) => {
  res.json({ message: 'Application de gestion de notes' });
});
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
