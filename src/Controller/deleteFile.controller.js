const cloudinary = require("../Helpers/cloudinary.config");
const FilesModel = require("../Models/file.model");
const createHttpError = require("http-errors");

module.exports = {
  deleteCloudinary: async (bodyData) => {
    var deleteCloudinaryFile = await cloudinary.uploader.destroy(
      bodyData.public_id
    );

    if (deleteCloudinaryFile.result === "ok") {
      await FilesModel.findOneAndDelete(
        { _id: bodyData.file_id },
        (error, res) => {
          if (error)
            return {
              data: "error",
              message: createHttpError.BadRequest(
                "Some Error happen to upload file!"
              ),
            };
        }
      );
    } else {
      return {
        data: "error",
        message: createHttpError.NotFound("File Not Found on Drive!"),
      };
    }
    return {
      status: 200,
      message: "File Deleted Successfully!",
    };
  },
  deleteOneDrive: async (bodyData) => {
    return bodyData;
  },
  deleteGDrive: async (bodyData) => {
    return bodyData;
  },
  deleteDropBox: async (bodyData) => {
    return bodyData;
  },
  deleteS3: async (bodyData) => {
    return bodyData;
  },
};
