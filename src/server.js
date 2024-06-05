const express = require("express");
const routes = require("./routes");

const app = express();

// Start the server and start to sisten at the port (...)
const port = 4000;
app.listen(port, () => {
  console.log("Server start at port:", port);
});

// Definy json as the defauly body type
app.use(express.json());

// Import Routes
app.use(routes);

app.use((err, request, response, next) => {
  console.log("test");
  if (err instanceof ApiError) {
    return response.status(err.status).json({
      status: "error",
      message: err.message,
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
