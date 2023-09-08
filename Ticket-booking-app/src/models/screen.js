const mongoose = require('mongoose')

let screenSchema = new mongoose.Schema({
    theatreName: {
      type: String,
      required: true,
      trim: true
    },
    movieInfo:[{
      name: {
      type: String,
      required: true,
      trim: true,
    },
    screenNumber:{
      type:Number,
      required:true
    },
    seatInfo: {
      type: Number,
      required: true
    },
    reservedSeats: {
      type: Number,
      default:0
    }
    }]   
  }); 
 let Screen = mongoose.model('Screen', screenSchema) 
 module.exports = Screen