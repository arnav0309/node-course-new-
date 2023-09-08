const mongoose = require('mongoose')
let locationSchema = new mongoose.Schema({
    location:{
        type:String,
        required:true,
        unique:true
    },
        screenInfo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Screen' }]
    
})


 locationSchema.statics.findByLocation=async(loc)=>{
    const isAvailable=await Location.findOne({location:loc})
    if(isAvailable) return isAvailable
    else return false
 }
 const Location = mongoose.model('Location',locationSchema)
module.exports = Location