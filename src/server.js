const express = require("express");
require("express-async-errors");
const routes = require("./routes");
const ApiReturn = require("./utils/ApiReturn");

const app = express();

// Definy json as the defauly body type
app.use(express.json());

// Import Routes
app.use(routes);

app.use((err, request, response, next) => {
  if (err instanceof ApiReturn) {
    return response.status(err.statusCode).json({
      message: err.message,
      data: err.data,
    });
  }

  console.error(err);
  return response.status(500).json({
    message: "Internal Server Error!",
  });
});

// Start the server and start to sisten at the port (...)
const port = 4000;
app.listen(port, () => {
  console.log("Server start at port:", port);
});
