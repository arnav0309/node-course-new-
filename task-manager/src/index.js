const express = require('express')
require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task')
const app=express()
const userRouter = require('./router/user')
const taskRouter = require('./router/task')
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)





app.listen(PORT,()=>{
    console.log('Server is running successfully!')
})