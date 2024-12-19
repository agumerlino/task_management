const { Pool } = require("pg");
require("dotenv").config();

// Crear un pool de conexiones a PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Exportar el pool para que pueda ser utilizado en otros archivos
module.exports = {
  query: (text, params) => pool.query(text, params),
};