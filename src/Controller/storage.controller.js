const cloudinary = require("../Helpers/cloudinary.config");
const Files = require("../Models/file.model");

module.exports = {
  cloudinary: async (file) => {
    const data = await cloudinary.uploader.upload(file.path);
    console.log("Successfully uploaded to Cloudinary!");
    const fileData = new Files({
      name: file.originalname,
      file_type: data.resource_type,
      format: data.format,
      url: data.url,
      public_id: data.public_id,
    });
    const savedFileData = await fileData.save();
    return savedFileData;
  },
};
