const mongoose=require('mongoose')

const bookingSchema = new mongoose.Schema({
    booking_id:{
        //required:true
    },
    seatInfo:{

    }
})
const Booking = mongoose.model('Booking', bookingSchema) 
 module.exports = Booking