import express from 'express'; 
import mainController from './controllers/mainController.js';

const router = express.Router();

// Page d'accueil
router.get('/', mainController.homePage);
  
// Page catalogue
router.get('/catalogue', mainController.catalogPage);

// Page produit
router.get('/produit/:coffeeId', mainController.productPage);

// Page boutique
router.get('/boutique', mainController.shopPage);

// Page notre savoir faire
router.get('/notre-savoir-faire', mainController.knowHow);

// Page mentions légales
router.get('/mentions-legales', mainController.legalNotice);

// Route de traitement du formulaire de contact
router.post('/api/send-email', mainController.contactForm)

export default router;