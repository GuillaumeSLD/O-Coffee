import database from '../database.js'; 

const filtersDataMapper = {
  async getOriginFilter() {
    const query = `SELECT "name" AS "origin" FROM "origin";`;
    const result = await database.query(query);
    return result.rows;
  },

  async getTasteFilter() {
    const query = `SELECT "name" AS "taste" FROM "taste";`;
    const result = await database.query(query);
    return result.rows;
  },

  async getPriceMinAndMaxFilter() {
    const query = `SELECT MIN("price_kg") AS "min_price", MAX("price_kg") AS "max_price" FROM "coffee";`;
    const result = await database.query(query);
    return result.rows[0];
  },

  async getAvailabilityFilter() {
    const query = `SELECT DISTINCT "availability" FROM "coffee";`;
    const result = await database.query(query);
    return result.rows;
  },

  async getFilteredCoffees(params) {
    // On définit une requête de base qui récupère tous les cafés
    let query = `
      SELECT 
        coffee."id", 
        coffee."name", 
        coffee."reference", 
        coffee."description", 
        origin."name" AS "origin_name", 
        taste."name" AS "taste_name", 
        coffee."price_kg", 
        coffee."availability"
      FROM 
        "coffee"
      JOIN "origin" ON coffee."origin" = origin."id"
      JOIN "taste" ON coffee."taste" = taste."id"`;
    
    // On définit une variable qui va contenir les conditions de la requête
    const conditions = [];

    // On définit une variable qui va contenir les valeurs à injecter dans la requête
    const values = [];
  
    // On déclare une fonction pour vérifier si le(s) paramètre(s) passé(s) à la fonction getFilteredCoffees() est une valeur unique ou un tableau de valeurs
    function handleFilter(field, param) {
      if (Array.isArray(param) && param.length > 0) {
        // Dans le cas d'un tableau, utilisation de "IN"
        const placeholders = param.map((_, index) => `$${values.length + index + 1}`).join(', ');
        conditions.push(`${field} IN (${placeholders})`);
        values.push(...param);
      } else if (param) {
        // Dans le cas d'une valeur unique, utilisation de "="
        conditions.push(`${field} = $${values.length + 1}`);
        values.push(param);
      }
    }
    
    // Si un paramètre origin existe, on le passe à la fonction handleFilter pour vérifier si il contient soit une soit plusieurs valeurs
    if (params.origin) {
      handleFilter('origin."name"', params.origin);
    }
  
    // Si un paramètre taste existe, on le passe à la fonction handleFilter pour vérifier si il contient soit une soit plusieurs valeurs
    if (params.taste) {
      handleFilter('taste."name"', params.taste);
    }

    // Si un paramètre availability existe, on le passe à la fonction handleFilter pour vérifier si il contient soit une soit plusieurs valeurs
    if (params.availability) {
      handleFilter('coffee."availability"', params.availability);
    }
  
    // Si des conditions ont été ajoutées, les ajouter à la requête
    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    const result = await database.query(query, values);
    return result.rows;
  }
};

export default filtersDataMapper;