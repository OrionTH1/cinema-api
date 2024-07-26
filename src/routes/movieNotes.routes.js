const { Router } = require("express");
const MovieNotesControlller = require("../controllers/MovieNotesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const movieNotesRoutes = Router();
const movieNotesController = new MovieNotesControlller();

movieNotesRoutes.use(ensureAuthenticated);

movieNotesRoutes.post("/", movieNotesController.create);
movieNotesRoutes.get("/:id", movieNotesController.show);
movieNotesRoutes.get("/", movieNotesController.index);
movieNotesRoutes.put("/:id", movieNotesController.update);
movieNotesRoutes.delete("/:id", movieNotesController.delete);

module.exports = movieNotesRoutes;
