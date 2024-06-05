// Update with your config settings.
const path = require("path");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  client: "sqlite3", // or 'better-sqlite3'
  connection: {
    filename: path.resolve(__dirname, "src", "database", "database.db"),
  },
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "migrations"),
  },
  useNullAsDefault: true,
};
