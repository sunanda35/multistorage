const mongoose = require("mongoose");
const FileSchema = new mongoose.Schema(
  {
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
    size: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const FileData = mongoose.model("filesData", FileSchema);
module.exports = FileData;
