const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    payment_id:{
        //required:true
    },
    paidStatus:{
        typr:String,
        //required:true,
    },
    totalPaid:{
        type:Number
    }
})

let Payment = mongoose.model('Payment', paymentSchema) 
 module.exports = Payment