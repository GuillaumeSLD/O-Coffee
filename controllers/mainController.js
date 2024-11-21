import filtersDataMapper from "../models/filtersDataMapper.js";
import mainDataMapper from "../models/mainDataMapper.js";

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
  }
};

export default mainController;