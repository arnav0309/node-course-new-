const express = require('express')
require('./db/mongoose')


const User = require('./models/user')
const screen = require('./models/screen')
const app=express()
const userRouter = require('./routers/user')
const screenRouter = require('./routers/screen')
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(screenRouter)





app.listen(PORT,()=>{
    console.log('Server is running successfully!')
})