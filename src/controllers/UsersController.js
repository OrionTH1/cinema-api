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
    const [user_id] = await connection("users").insert({
      name,
      email,
      password,
    });

    reponse
      .status(201)
      .json(
        new ApiReturn("User created successfully", { user_id, name, email })
      );
  }

  async delete(request, response) {
    const { id } = request.params;

    const user = await connection("users").where({ id });

    if (!user.length) {
      throw new ApiReturn("This user doesn't exists", {}, 400);
    }

    await connection("users").where({ id }).delete();

    reponse.status(201).json({
      status: "success",
      message: "User created successfully",
    });
  }
}

module.exports = UsersController;
