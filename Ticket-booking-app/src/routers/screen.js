const express = require('express')
const router = new express.Router()
const Location = require('../models/location')
const Screen = require('../models/screen')

const { default: mongoose } = require('mongoose')


//API to accept details of movie screen
router.post('/screens', async (req, res) => {

    try {
        const locationInfos= await Location.findByLocation(req.body.location)
        console.log('good0')
        if(locationInfos===false){
            const scr = new Screen({
                _id:new mongoose.Types.ObjectId(),
                theatreName:req.body.theatreName,
                theatreLocation:req.body.location,
                movieInfo:req.body.movieInfo,
                
                seatInfo:req.body.seatInfo
              })
              console.log('good0+1')
              await scr.save();
              console.log('good1')
            const loc = new Location({
                location:req.body.location,
                screenInfo:scr._id
              });
              await loc.save();
              console.log('good2')
        }else{
            const scr = new Screen({
                _id:new mongoose.Types.ObjectId(),
                theatreName:req.body.theatreName,
                theatreLocation:req.body.location,
                movieInfo:req.body.movieInfo,
                
                seatInfo:req.body.seatInfo
              })
              await scr.save();
            locationInfos.screenInfo.push(scr._id)
            await locationInfos.save()
            console.log('good3')
        }
        
      
      res.send();
    } catch (e) {
        res.status(400).send(e);
    }
  
  })
//get screen info at a location
router.get('/screens/:location',async(req,res)=>{
    const loc = req.params.location
    
    
    try{
        const screenAtLoc = await Location.find({location:loc})
        //const screenInfo = await Screen.find({})
        const names=[]
        let index=0
        while(index<screenAtLoc.length){
            names.push([screenAtLoc[index]._id,screenAtLoc[index].screenInfo])
            index++
        }
         //names = screenAtLoc.map(function(item){return item["theatreName"&&"_id"]})
        res.send(names)
    }catch(e){
        res.status(400).send()
    }
})
//Movies info at a perticular screen at a perticular location
router.post('/screens/:id',async(req,res)=>{
    
    const _id = req.params.id
    //console.log(req.params.id)
    try{
        
        const screen =await Screen.findOne({_id:_id})


        const names=[]
        
        let index=0
        while(index<screen.movieInfo.length){
            names.push([screen.movieInfo[index].name,screen.movieInfo[index].screenNumber])
            index++
        }



        //console.log(names)
        //const movies = screen.
        res.send({theatreName:screen.theatreName,movieName:names})
        //res.send(screen.theatreName)
    }catch(e){
        res.status(400).send()
    }
})

  module.exports=router