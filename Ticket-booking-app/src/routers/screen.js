const express = require('express')
const router = new express.Router()
const Screen = require('../models/screen')


//API to accept details of movie screen
router.post('/screens', async (req, res) => {

    try {
      const screen = new Screen(req.body);
      await screen.save();
      res.send();
    } catch (e) {
        res.status(400).send(e);
    }
  
  })

router.get('/screens/info',async(req,res)=>{
    try{
        const screenInfo = await Screen.find({})
        res.send(screenInfo)
    }catch(e){
        res.status(400).send()
    }
})

router.get('/screens/:_id',async(req,res)=>{
    const _id = req.params.id
    try{
        
        const screen =await Screen.findOne(_id)
        const seatAvailable = (screen.seatInfo-screen.reservedSeats) 
        const msg = 'NUmber of available seats for movie '+screen.name+' is '+seatAvailable
        res.send(msg)
    }catch(e){
        res.status(400).send()
    }
})

  module.exports=router