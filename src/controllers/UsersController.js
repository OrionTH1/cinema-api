const connection = require("../database/knex");
const ApiError = require("../utils/ApiError");

class UsersController {
  async create(request, reponse) {
    const { name, email, password } = request.body;

    // Checks if all the data is sent
    if (!name || !email || !password) {
      throw new ApiError("Name, email and password is required!", 400);
    }

    // Create user in Table Users
    await connection("users").insert({ name, email, password });

    reponse.status(201).json({
      status: "success",
      message: "User created successfully",
    });
  }
}

module.exports = UsersController;
