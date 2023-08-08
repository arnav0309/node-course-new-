const express = require('express')
require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task')
const app=express()
const PORT = process.env.PORT || 3000

app.use(express.json())


app.get('/users',(req,res)=>{
    User.find({}).then((user)=>{
        res.send(user)
    }).catch((e)=>{
        res.status(500).send()
    })
})

app.get('/users/:id',(req,res)=>{
    const _id = req.params.id
    User.findById(_id).then((user)=>{
        if(!user){
            return res.status(400).send()
        }
        res.send(user)
    }).catch((e)=>{
        res.status(500).send()
    })
})
app.post('/users',(req,res)=>{
    const user = new User(req.body)

    user.save().then(()=>{
        res.send(user)
    }).catch((error)=>{
        res.status(400).send(error)
    })
   
})

app.get('/tasks',(req,res)=>{
    Task.find({}).then((task)=>{
        res.send(task)
    }).catch((e)=>{
        res.status(500).send()
    })
})

app.get('/tasks/:id',(req,res)=>{
    const _id = req.params.id
    Task.findById(_id).then((task)=>{
        if(!task){
            res.status(400).send()
        }
        res.send(task)
    }).catch((e)=>{
        res.status(500).send()
    })
})

app.post('/tasks',(req,res)=>{
    const task = new Task(req.body)
    task.save().then(()=>{
        res.send(task)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

app.listen(PORT,()=>{
    console.log('Server is running successfully!')
})