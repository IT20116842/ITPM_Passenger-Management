const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Booking = new Schema(
  {
    RootNo: { type: String },
    From: { type: String },
    To: { type: String },
    BookingDate: { type: String },
    seatNo: { type: String },
    qty: { type: Number },
    price: { type: String }, 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("booking", Booking);
