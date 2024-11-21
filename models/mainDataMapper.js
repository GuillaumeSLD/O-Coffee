import database from '../database.js'; 

const mainDataMapper = {
  async getAllCoffees() {
    const query = `SELECT 
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
        JOIN 
        "origin" ON coffee."origin" = origin."id"
        JOIN 
        "taste" ON coffee."taste" = taste."id";`;
    const result = await database.query(query);
    return result.rows;
  },

  async getLastCoffees() {
    const query = `SELECT 
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
        JOIN 
        "origin" ON coffee."origin" = origin."id"
        JOIN 
        "taste" ON coffee."taste" = taste."id"
        ORDER BY "id" DESC
        LIMIT 3;
    `;
    const result = await database.query(query);
    return result.rows;
  },

  async getCoffeePage(id) {
    const query = `SELECT 
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
        JOIN 
        "origin" ON coffee."origin" = origin."id"
        JOIN 
        "taste" ON coffee."taste" = taste."id"
        WHERE coffee."id" = $1;
    `;
    const coffeeId = [id];
    const result = await database.query(query, coffeeId);
    return result.rows[0];
  },

  async getSimilarCoffees() {
    const query = `SELECT 
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
        JOIN 
        "origin" ON coffee."origin" = origin."id"
        JOIN 
        "taste" ON coffee."taste" = taste."id"
        ORDER BY random()
        LIMIT 4;
    `;
    const result = await database.query(query);
    return result.rows;
  }
};


export default mainDataMapper;