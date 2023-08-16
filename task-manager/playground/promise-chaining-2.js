require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndRemove('64d099fa73850c1e2783a648').then((task)=>{
    console.log(task)
    return Task.countDocuments({completed:false})
}).then((data)=>{
    console.log(data)
}).catch((e)=>{
    console.log(e)
})