// Update with your config settings.
const path = require("path");
const { callbackify } = require("util");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  client: "sqlite3", // or 'better-sqlite3'
  connection: {
    filename: path.resolve(__dirname, "src", "database", "database.db"),
  },
  pool: {
    afterCreate: (connection, callback) => {
      connection.run("PRAGMA foreign_keys = ON", callback);
      connection.run("PRAGMA case_sensitive_like = OFF", callback);
    },
  },
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "migrations"),
  },
  useNullAsDefault: true,
};
