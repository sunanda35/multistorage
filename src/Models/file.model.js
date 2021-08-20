const mongoose = require("mongoose");
const FileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  file_type: {
    type: String,
    required: true,
  },
  format: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
});

const FileData = mongoose.model("filesData", FileSchema);
module.exports = FileData;
