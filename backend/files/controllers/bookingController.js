const express = require("express");
const Booking = require("../models/bookingModal");  
const Router = express.Router();

/**
 * Add Booking details controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.post("/addBooking",async (req, res) => {
    try {
      
    const booking = new Booking({
        "RootNo":req.body.RootNo,
        "From":req.body.From,
        "To":req.body.To,
        "BookingDate":req.body.BookingDate,
        "seatNo":req.body.seatNo,
        "qty":req.body.qty, 
        "price":req.body.price, 
      });
      console.log(booking);
      await booking.save();
      res.send("successfully new Booking added to the system.");
    } catch (error) {
      res
        .status(400)
        .send("Error while uploading Booking details. Try again later. " + error);
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);
 
/**
 * update Booking details controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.put("/:id", async (req, res) => {
  try {
    console.log(req.body._id)
    const data = {
      "RootNo":req.body.RootNo,
      "From":req.body.From,
      "To":req.body.To,
      "BookingDate":req.body.BookingDate,
      "seatNo":req.body.seatNo,
      "qty":req.body.qty, 
      "price":req.body.price, 
    };
    console.log(data)
    let booking = await Booking.findByIdAndUpdate(req.body._id, data, { new: true });
    res.json(booking);
    console.log(booking)
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

/**
 * delete Booking details controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.delete("/deleteBooking/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const removed = await Booking.deleteOne({ "_id": req.params.id });
    if (!removed)
      throw Error("Something went wrong while trying to delete the file");

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

/**
 *get booking by id controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.get("/getBooking/:id", async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);
    const booking = await Booking.find({ "_id":id });
    res.send(booking);
  } catch (error) {
    res
      .status(400)
      .send("Error while getting booking details. Try again later." + error);
  }
}); 

Router.get("/getAllBooking", async (req, res) => {
  try {
    const booking = await Booking.find({});
    const sortedByCreationDate = booking.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send("Error while getting list of Booking. Try again later." + error);
  }
});

module.exports = Router;
