const path = require("path");
const express = require("express");
const multer = require("multer");
const User = require("../models/userModel");  
const upload = require("../utils/multer");
const Router = express.Router();

/**
 * sign in controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.post("/signin", async (req, res) => {
  const { userName, password } = req.body;

  try {
    //find user by username
    console.log(userName)
    const getUser = await User.findOne({ "userName":userName });
    if (!getUser) return res.status(404).json({ message: "Account not found" });
    if (password != getUser.password)
      return res.status(404).json({ message: "Invalid password" });

      return res.status(200).json({
        message: "Login successful",
        user: getUser, 
      });
    
  } catch (e) {
    res.status(500).json({ message: "Server error" + e });
  }
});

/**
 *get user by id controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.get("/getUser/:id", async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);
    const user = await User.find({ "userName":id });
    res.send(user);
  } catch (error) {
    res
      .status(400)
      .send("Error while getting user details. Try again later." + error);
  }
});
module.exports = Router;
