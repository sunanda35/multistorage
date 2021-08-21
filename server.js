const express = require("express");
const createHttpError = require("http-errors");
const path = require("path");
const fileApiRoute = require("./src/Routers/file.route");
const app = express();
require("./src/Helpers/mongodb.config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.use("/api/file/", fileApiRoute); //file api route

app.use(async (req, res, next) => {
  next(createHttpError.NotFound("This url is not available"));
}); //to catch all not available route

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
}); //to catch all errors

app.listen(PORT, () => console.log(`app running at: http://localhost:${PORT}`));
