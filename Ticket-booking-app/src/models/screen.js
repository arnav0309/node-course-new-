const mongoose = require('mongoose')

let screenSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    seatInfo: {
      type: Number,
      required: true
    },
    reservedSeats: {
      type: Number,
      default:0
    }
  });
  
  let Screen = mongoose.model('Screen', screenSchema)
  
  module.exports = Screen