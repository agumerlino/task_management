require('dotenv').config(); 

module.exports = {
  client: 'pg',  // Cliente de PostgreSQL
  connection: process.env.DATABASE_URL,  
  migrations: {
    tableName: 'knex_migrations',  
    directory: './migrations',     
  },
};