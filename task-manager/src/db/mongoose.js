const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager')



// const me = new User({
//     name: '   Anand  ',
//     email: 'MYEMAIL@MEAD.IO   ',
//     password:'  anand@1234  '
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!', error)
// })




// const task = new Task({
//     description:'   testing the task model     ',
    
// })

// task.save().then((task)=>{
//     console.log(task)
// }).catch((e)=>{
//     console.log(e)
// })