// const knex = require("../../knexfile");

class UsersController {
  async create(request, reponse) {
    const { name, email, password } = request.body;

    // await knex("users").insert(name);

    reponse.status(201).json();
  }
}

module.exports = UsersController;
