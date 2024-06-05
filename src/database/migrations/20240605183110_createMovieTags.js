/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("movie_tags", (table) => {
    // Primary key
    table.increments("id");

    table.integer("note_id").references("id").inTable("movie_notes");
    table.integer("user_id").references("id").inTable("users");

    table.string("name");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
