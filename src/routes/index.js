const { Router } = require("express");
const usersRoutes = require("./users.routes");
const movieNotesRoutes = require("./movieNotes.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/notes", movieNotesRoutes);

module.exports = routes;
