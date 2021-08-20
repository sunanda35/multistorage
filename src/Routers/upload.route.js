const express = require("express");
const createHttpError = require("http-errors");
const Router = express.Router();
const storageOption = require("../Controller/storage.controller");
const Files = require("../Models/file.model");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

Router.post("/upload/:cloud", upload.single("file"), async (req, res, next) => {
  try {
    const storageBox = req.params.cloud;
    const dataFile = req.file;

    switch (storageBox) {
      case "cloudinary":
        const data = await storageOption.cloudinary(dataFile);
        res.status(200).send(data);
        break;
      case "oneDrive":
        res.send("oneDrive");
        break;
      case "gDrive":
        res.send("gDrive");
        break;
      case "dropBox":
        res.send("dropbox");
        break;
      default:
        next(createHttpError.NotFound("No Drive found with this name. Sorry!"));
    }
  } catch (err) {
    next(err);
  }
});

module.exports = Router;
