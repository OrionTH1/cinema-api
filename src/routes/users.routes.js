const { Router } = require("express");
const UsersController = require("../controllers/UsersController");

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.delete("/:id", usersController.delete);
usersRoutes.put("/:id", usersController.update);

module.exports = usersRoutes;
