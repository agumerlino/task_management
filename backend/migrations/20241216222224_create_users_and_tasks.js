/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
      // Crear la tabla users
      .createTable('users', function(table) {
        table.increments('id').primary(); 
        table.string('username').unique().notNullable(); 
        table.string('password').notNullable(); 
      })
      // Crear la tabla tasks
      .createTable('tasks', function(table) {
        table.increments('id').primary(); 
        table.string('title').notNullable();
        table.boolean('completed').defaultTo(false); 
        table.integer('user_id').unsigned().notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
  
        // Definir la relación de clave foránea
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
      });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema
      // Eliminar la tabla tasks
      .dropTableIfExists('tasks')
      // Eliminar la tabla users
      .dropTableIfExists('users');
  };
