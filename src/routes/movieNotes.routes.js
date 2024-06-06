const { Router } = require("express");
const MovieNotesControlller = require("../controllers/MovieNotesController");

const movieNotesRoutes = Router();
const movieNotesController = new MovieNotesControlller();

movieNotesRoutes.post("/:id", movieNotesController.create);
movieNotesRoutes.get("/:id", movieNotesController.show);
movieNotesRoutes.get("/", movieNotesController.index);
movieNotesRoutes.put("/:id", movieNotesController.update);
movieNotesRoutes.delete("/:id", movieNotesController.delete);

module.exports = movieNotesRoutes;
