const cloudinary = require("../Helpers/cloudinary.config");
const FilesModule = require("../Models/file.model");

module.exports = {
  cloudinary: async (file) => {
    const data = await cloudinary.uploader.upload(file.path, {
      folder: "multistorage",
    });
    console.log("Successfully uploaded to Cloudinary!");
    const fileData = new FilesModule({
      name: file.originalname,
      file_type: data.resource_type,
      storage_drive: "cloudinary",
      format: data.format,
      size: file.size,
      url: data.url,
      public_id: data.public_id,
    });
    const savedFileData = await fileData.save();
    return savedFileData;
  },
  oneDrive: async (file) => {
    return "Its oneDrive storage file upload";
  },
  gDrive: async (file) => {
    return "Its gDrive storage file upload";
  },
  dropBox: async (file) => {
    return "Its dropbox storage file upload";
  },
  s3: async (file) => {
    return "Its s3 storage file upload";
  },
};
