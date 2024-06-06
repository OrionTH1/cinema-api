class ApiReturn {
  message;
  data;
  statusCode;

  constructor(message, data, statusCode) {
    this.message = message;

    if (data) {
      this.data = data;
    }
    if (statusCode) this.statusCode = statusCode;
  }
}

module.exports = ApiReturn;
