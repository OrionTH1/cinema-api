const { compare } = require("bcryptjs");
const auth = require("../config/auth");
const connection = require("../database/knex");
const ApiReturn = require("../utils/ApiReturn");
const { sign } = require("jsonwebtoken");

class SessionController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await connection("users").where({ email }).first();

    if (!user) {
      throw new ApiReturn("Email or password invalid", null, 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new ApiReturn("Email or password invalid", null, 401);
    }

    const { expiresIn, secret } = auth.jwt;

    const token = sign({}, secret, { subject: String(user.id), expiresIn });

    return response.json({ user, token });
  }
}

module.exports = SessionController;
