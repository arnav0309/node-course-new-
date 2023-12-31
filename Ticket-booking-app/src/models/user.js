require('dotenv').config()
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique:true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minLength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password can not contains password')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    // ticket:{
    //     type:Number,
    //     default:0
    // },
    // bookingStatus:{
    //     type:Boolean,
    //     default:false
    // },
    bookingInfo:[{type:mongoose.Schema.Types.ObjectId,ref:'Booking'}],
    paymentInfo:[{type:mongoose.Schema.Types.ObjectId,ref:'Payment'}],
    bookedMovieInfo:[],
    mallId:{
        
    }
    
})

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    //delete userObject.mallId
    return userObject
}

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},process.env.TOKEN_VERIFICATION_CODE)
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}


userSchema.statics.findByCredentials = async (email,password)=>{
    
    const user = await User.findOne({email})
    
    if(!user) {
        throw new Error('unable to login')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch) {
        throw new Error('unable to login')
    }
   // console.log(user)
    return user
}

userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    next()
})

const User = mongoose.model('User', userSchema)
module.exports=User