const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema(
  {
    userName: { type: String },
    FirstName: { type: String },
    LastName: { type: String },
    email: { type: String },
    gender: { type: String },
    password: { type: String },
    proPic: { type: String },
    cloudinary_id: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", User);
