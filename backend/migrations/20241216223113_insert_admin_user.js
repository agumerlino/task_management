/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    // Insertar el usuario admin en la tabla users
    return knex('users').insert({
      username: 'admin',
      password: '12345',
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    // Eliminar el usuario admin en caso de revertir la migración
    return knex('users').where('username', 'admin').del();
  };
  