const { Router } = require("express");
const usersRoutes = require("./users.routes");
const movieNotesRoutes = require("./movieNotes.routes");
const sessionRoutes = require("./session.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/notes", movieNotesRoutes);
routes.use("/sessions", sessionRoutes);

module.exports = routes;
