import filtersDataMapper from "../models/filtersDataMapper.js";
import mainDataMapper from "../models/mainDataMapper.js";
import emailjs, { EmailJSResponseStatus } from '@emailjs/nodejs';

const mainController = {
  async homePage(req, res) {
    try {
        const coffees = await mainDataMapper.getLastCoffees();
        res.render('home', { coffees, title: "Accueil - O'Coffee" });
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },

  async catalogPage(req, res) {
    try {
      // Récupération des produits
      let coffees;

      // Récupération des filtres disponibles
      const originFilter = await filtersDataMapper.getOriginFilter();
      const tasteFilter = await filtersDataMapper.getTasteFilter();
      //const priceFilter = await filtersDataMapper.getPriceMinAndMaxFilter();
      const availabilityFilter = await filtersDataMapper.getAvailabilityFilter();

      // Agrégation des filtres disponibles dans un objet
      const filters = {
        origins: originFilter,
        tastes: tasteFilter,
        // price_range: priceFilter,
        availability: availabilityFilter
      }

      // Test si query params sont présents dans l'url
      const queryParams = req.query;
      if (Object.keys(queryParams).length > 0) {
        console.log(queryParams);
        // Si on a des query params, on appelle le dataMapper des filtres
        coffees = await filtersDataMapper.getFilteredCoffees(queryParams);
      } else {
        // Si on n'a pas de query params, on appelle le dataMapper principal
        coffees = await mainDataMapper.getAllCoffees();
      }
      
      res.render('catalog', { coffees, filters, title: "Catalogue - O'Coffee", metaDescription: "Retrouvez tous nos cafés disponibles à la vente dans notre boutique O'Coffee des Hauts-de-Cloques." });
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },

  async productPage(req, res) {
    try {
        const coffeeId = parseInt(req.params.coffeeId, 10);
        if(coffeeId) {
          const coffee = await mainDataMapper.getCoffeePage(coffeeId);
          const similarCoffees = await mainDataMapper.getSimilarCoffees();
          res.render('product', { coffee, similarCoffees, title: coffee.name + " - O'Coffee", metaDescription: coffee.name + " - " + coffee.description });
        }
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },

  shopPage(req, res) {
    res.render('shop', { title: "Boutique - O'Coffee" });
  },

  knowHow(req, res) {
    res.render('knowHow', { title: "Notre savoir-faire - O'Coffee" });
  },

  legalNotice(req, res) {
    res.render('legalNotice', { title: "Mentions légales - O'Coffee" });
  },

  async contactForm(req, res) {
    const { first_name, last_name, email, message, recaptcha_response } = req.body;

    // Vérifier que tous les champs sont présents
    if (!first_name || !last_name || !email || !message || !recaptcha_response) {
        console.log('Des champs sont manquants');
        return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;

    try {
        // Envoi de la requête de vérification au serveur de Google
        const captchaResponse = await fetch(verifyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                secret: process.env.RECAPTCHA_SECRET_KEY, // Votre clé secrète reCAPTCHA
                response: recaptcha_response,  // Le token reCAPTCHA
            }),
        });

        // Récupération de la réponse JSON de Google
        const captchaData = await captchaResponse.json();

        // Si le reCAPTCHA n'est pas validé
        if (!captchaData.success) {
            console.log('Échec validation reCAPTCHA:', captchaData['error-codes']);
            return res.status(400).json({ error: 'Échec de la vérification du reCAPTCHA.' });
        }

        // Si reCAPTCHA est validé, procéder à l'envoi de l'email avec le token reCAPTCHA
        const response = await emailjs.send(
            process.env.EMAILJS_SERVICE_ID,
            process.env.EMAILJS_TEMPLATE_ID,
            {
                first_name, 
                last_name, 
                email, 
                message,
                'g-recaptcha-response': recaptcha_response, // Envoyer le token valide
            },
            { 
                publicKey: process.env.EMAILJS_PUBLIC_KEY,
                privateKey: process.env.EMAILJS_PRIVATE_KEY,
            }
        );

        return res.status(200).json({ message: 'E-mail envoyé avec succès.' });
    } catch (err) {
        console.error('Erreur lors de la vérification ou de l\'envoi:', err);
        return res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'e-mail.' });
    }

}

};

export default mainController;