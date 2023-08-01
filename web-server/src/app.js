const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const locationIq = require('./utils/locationIq')
const weather = require('./utils/weather')

const publicDirectory = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../template/views')
const partialPath = path.join(__dirname,'../template/partials')


app.set('view engine', 'hbs')
app.set('views',viewpath)
hbs.registerPartials(partialPath)
app.use(express.static(publicDirectory))



app.get('',(req,res)=>{
    res.render('index',{
        title:'weather',
        name:'Anand Kumar'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Anand Kumar'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        textmsg:'This is help page',
        title:'help',
        name:'Anand Kumar'
    })
})

app.get('/weather',(req,res)=>{
    //console.log(req.query)
    if(!req.query.address) return res.send({error:'Please enter the place name'})
    const address = req.query.address
    locationIq(address,(error,{longtitude,latitude,location}={})=>{ // here i have done destructuring
        if(error) return res.send({error})
     
        weather(longtitude,latitude,(error,weatherData)=>{
           if(error) return res.send({error})
     
        //    console.log(data.location)
          
        //    console.log(weatherData)
           res.send({
            forecast:weatherData,
            location:location,
            address:req.query.address
        })
        })
     })
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        msg:'Help Article Not Found!',
        name:'Anand Kumar'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        msg:'Page not found!',
        name:'Anand Kumar'
    })
})



// app.get('/',(req,res)=>{
//     res.send('Hello Express!') // this app.get is of no use because of above static express function call
// })

// app.get('/help',(req,res)=>{
//     res.send('Help page!')
// })

// app.get('/about',(req,res)=>{
//     res.send('About page')
// })

app.listen(3000,()=>{
    console.log('Server is running')
})