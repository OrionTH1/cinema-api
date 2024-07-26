const { hash, compare } = require("bcryptjs");
const connection = require("../database/knex");
const ApiReturn = require("../utils/ApiReturn");

class UsersController {
  async create(request, reponse) {
    const { name, email, password } = request.body;

    // Checks if all the data is sent
    if (!name || !email || !password) {
      throw new ApiReturn("Name, email and password is required!", null, 400);
    }

    const user = await connection("users").where({ email });

    // Check if the user email already exists
    if (user.length) {
      throw new ApiReturn("Email already exists", null, 400);
    }

    const passwordHashed = await hash(password, 8);

    // Create user in Table Users
    const [user_id] = await connection("users").insert({
      name,
      email,
      password: passwordHashed,
    });

    reponse
      .status(201)
      .json(
        new ApiReturn("User created successfully", { user_id, name, email })
      );
  }

  async delete(request, response) {
    const user_id = request.user.id;

    const user = await connection("users").where({ id: user_id });

    if (!user.length) {
      throw new ApiReturn("This user doesn't exists", null, 400);
    }

    await connection("users").where({ id: user_id }).delete();

    response.json(new ApiReturn("User deleted successfully", { id: user_id }));
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    if (!name || !email || !password || !old_password) {
      throw new ApiReturn(
        "Name, email, old password and new password id required",
        null,
        400
      );
    }

    const user = await connection("users").where({ id: user_id }).first();

    if (!user) {
      throw new ApiReturn("User doesn't exists!", null, 400);
    }

    const verifyIfEmailExist = await connection("users")
      .where({ email })
      .first();

    if (verifyIfEmailExist && verifyIfEmailExist.id != user_id) {
      throw new ApiReturn("Email already exists!", null, 400);
    }

    const comparePassword = await compare(old_password, user.password);

    if (!comparePassword) {
      throw new ApiReturn("Old password is not correct!", null, 400);
    }

    const newPasswordHashed = await hash(password, 8);

    user.name = name;
    user.email = email;
    user.password = newPasswordHashed;

    await connection("users")
      .update({
        name: user.name,
        email: user.email,
        password: user.password,
        updated_at: connection.raw("DATETIME('now')"),
      })
      .where({ id: user_id });

    response.json(
      new ApiReturn("User updated successfully", {
        id: user.id,
        name: user.name,
        email: user.email,
      })
    );
  }
}

module.exports = UsersController;
