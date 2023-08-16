require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('64d098d40da7225fad3a500e',{age:1}).then((user)=>{
    console.log(user)
    return User.countDocuments({age:1})
}).then((data)=>{
    console.log(data)
}).catch((e)=>{
    console.log(e)
})