const createHttpError = require("http-errors");
const uploadController = require("./uploadFile.controller");
const deleteController = require("./deleteFile.controller");
const FilesModel = require("../Models/file.model");
module.exports = {
  uploadFile: async (req, res, next) => {
    try {
      const storageBox = req.params.cloud;
      const dataFile = req.file;
      switch (storageBox) {
        case "cloudinary":
          const cloudinary = await uploadController.cloudinary(dataFile);
          res.status(200).send(cloudinary);
          break;
        case "oneDrive":
          const oneDrive = await uploadController.oneDrive(dataFile);
          res.status(200).send(oneDrive);
          break;
        case "gDrive":
          const gDrive = await uploadController.gDrive(dataFile);
          res.status(200).send(gDrive);
          break;
        case "dropBox":
          const dropBox = await uploadController.dropBox(dataFile);
          res.status(200).send(dropBox);
          break;
        case "s3":
          const s3 = await uploadController.s3(dataFile);
          res.status(200).send(s3);
          break;
        default:
          next(
            createHttpError.NotFound("No Drive found with this name. Sorry!")
          );
      }
    } catch (err) {
      next(err);
    }
  },
  fetchAll: async (req, res, next) => {
    try {
      await FilesModel.find({}, (err, result) => {
        if (err) return next(err);
        if (result.length === 0)
          return next(createHttpError.NotFound("No file found!"));
        res.status(200).send(result);
      });
    } catch (err) {
      next(err);
    }
  },
  deleteOne: async (req, res, next) => {
    try {
      const body = req.body;
      switch (req.body.drive) {
        case "cloudinary":
          const deleteCloudinary = await deleteController.deleteCloudinary(
            body
          );
          if (deleteCloudinary.data === "error") {
            next(deleteCloudinary.message);
          } else {
            res.status(200).send(deleteCloudinary);
          }
          break;
        case "oneDrive":
          const deleteOneDrive = await deleteController.deleteOneDrive(body);
          res.status(200).send(deleteOneDrive);
          break;
        case "gDrive":
          const deleteGDrive = await deleteController.deleteGDrive(body);
          res.status(200).send(deleteGDrive);
          break;
        case "dropBox":
          const deleteDropBox = await deleteController.deleteDropBox(body);
          res.status(200).send(deleteDropBox);
          break;
        case "s3":
          const deleteS3 = await deleteController.deleteS3(body);
          res.status(200).send(deleteS3);
          break;
        default:
          next(
            createHttpError.NotFound("No Drive found with this name. Sorry!")
          );
      }
      console.log(body);
    } catch (err) {
      next(err);
    }
  },
};
