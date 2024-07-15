export class SessionController {
  create(request, response) {
    const { email, password } = request.body;

    return response.json({ email, password });
  }
}
