const path = require("path");
const express = require("express");
const multer = require("multer");
const User = require("../models/userModel"); 
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Router = express.Router();

/**
 * Add user details controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.post("/addUser", upload.single("images"), async (req, res) => {
    try {
      
      const result = await cloudinary.uploader.upload(req.file.path);
      const { userName, lName, fName, gender, email, password } = req.body;
      const user = new User({
        "userName":req.body.userName,
        "FirstName":req.body.fName,
        "LastName":req.body.lName,
        "gender":req.body.gender,
        "email":req.body.email,
        "password":req.body.password,
        "proPic": result.secure_url,
        "cloudinary_id": result.public_id,
      });
      console.log(user);
      await user.save();
      res.send("successfully new user added to the system.");
    } catch (error) {
      res
        .status(400)
        .send("Error while uploading user details. Try again later. " + error);
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);
 
/**
 * update user details controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.put("/:id", async (req, res) => {
  try {
    console.log(req.body._id)
    const data = {
      "userName":req.body.userName,
      "FirstName":req.body.FirstName,
      "LastName":req.body.LastName,
      "gender":req.body.gender,
      "email":req.body.email,
      "password":req.body.password, 
    };
    console.log(data)
    let user = await User.findByIdAndUpdate(req.body._id, data, { new: true });
    res.json(user);
    console.log(user)
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

/**
 * delete user details controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.delete("/deleteUser/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const removed = await User.deleteOne({ _id: req.params.id });
    if (!removed)
      throw Error("Something went wrong while trying to delete the file");

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

module.exports = Router;
