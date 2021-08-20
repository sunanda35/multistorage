const express = require("express");
const createHttpError = require("http-errors");
const Router = express.Router();
const FilesModel = require("../Models/file.model");

Router.get("/fetch/all", async (req, res, next) => {
  try {
    FilesModel.find({}, (err, result) => {
      if (err) return next(err);
      res.status(200).send(result);
    });
  } catch (err) {
    next(err);
  }
});

module.exports = Router;
