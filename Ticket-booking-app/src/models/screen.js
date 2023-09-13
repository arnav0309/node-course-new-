const mongoose = require('mongoose')

let screenSchema = new mongoose.Schema({
    theatreName: {
      type: String,
      required: true,
      trim: true
    },
    theatreLocation:{
      type:String
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
    seatInfo: [{
      seatNumber:{
          type:String,
          required:true,
          //unique:true
      },
      status:{
          type:String,
          enum:['available','booked','reserved','unavailable'],
          default:'available'
      }
  }],
    ticketPrice: {
      type: Number,
     required:true
    }
    }]   
  }); 
 let Screen = mongoose.model('Screen', screenSchema) 
 module.exports = Screen