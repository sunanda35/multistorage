const express = require("express");
const Router = express.Router();

const multer = require("multer");
const fileApiController = require("../Controller/fileApi.controller");
const upload = multer({ dest: "uploads/" });

Router.post(
  "/upload/:cloud",
  upload.single("file"),
  fileApiController.uploadFile
);
Router.get("/fetch/all", fileApiController.fetchAll); // fetch all files
Router.post("/delete", fileApiController.deleteOne); // delete one file

module.exports = Router;
