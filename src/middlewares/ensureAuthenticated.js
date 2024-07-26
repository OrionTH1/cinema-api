const { verify } = require("jsonwebtoken");
const ApiReturn = require("../utils/ApiReturn");
const auth = require("../config/auth");

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return new ApiReturn("Authorization required", null, 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, auth.jwt.secret);

    request.user = {
      id: Number(user_id),
    };

    return next();
  } catch (e) {
    return new ApiReturn("Authorization token doesn't exist", null, 401);
  }
}
