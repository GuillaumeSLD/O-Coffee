import express from 'express';
import 'dotenv/config';
import router from './router.js'; 
import metaDescMw from './middlewares/metaDescMw.js';
import currentPageMw from './middlewares/currentPageMw.js';
import bodyParser from 'body-parser';

const app = express();

app.use(express.static('public'));

// Middleware pour analyser les requêtes JSON
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware pour définir une méta description par défaut
app.use(metaDescMw.metaDescription);

// Middleware pour définir la page courante
app.use(currentPageMw.currentPage);

// Appel du routeur
app.use(router);

// Page 404
app.use((req, res) => {
  res.status(404).render('404');
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
