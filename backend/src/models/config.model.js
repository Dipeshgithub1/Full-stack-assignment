const mongoose = require("mongoose");

const configurationSchema = new mongoose.Schema({
  configurationId: {
    type: String,
    required: true,
    unique: true,
  },
  matrix: {
    type: [[String]],
    required: true,
  },
  remark: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Configuration", configurationSchema);
