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
//get screen info at a location
router.get('/screens/:location',async(req,res)=>{
    const loc = req.params.location
    
    
    try{
        const screenAtLoc = await Screen.find({location:loc})
        //const screenInfo = await Screen.find({})
        const names=[]
        let index=0
        while(index<screenAtLoc.length){
            names.push([screenAtLoc[index]._id,screenAtLoc[index].theatreName])
            index++
        }
         //names = screenAtLoc.map(function(item){return item["theatreName"&&"_id"]})
        res.send(names)
    }catch(e){
        res.status(400).send()
    }
})
//Movies info at a perticular screen
router.post('/screens/:name',async(req,res)=>{
    const temp = req.params.name
    //console.log(temp)
    try{
        
        const screen =await Screen.findOne({theatreName:temp})
        console.log(screen)
        //const movies = screen.
        res.send(screen)
    }catch(e){
        res.status(400).send()
    }
})

  module.exports=router