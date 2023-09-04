const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
const Screen = require('../models/screen')


router.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
      await user.save()
      const token = await user.generateAuthToken()
      res.status(201).send({user,token})
  } catch (e) {
      res.status(400).send(e)
  }
})

router.post('/users/login',async(req,res)=>{
  try{
      const user =await  User.findByCredentials(req.body.email,req.body.password)
      const token = await user.generateAuthToken()
      //console.log(user)
      res.send({user,token})
  }catch(e){
      res.status(400).send()
  }
  
})

// router.post('/users/logout',auth,async(req,res)=>{
//   try{
//       req.user.tokens=req.user.tokens.filter((token)=>{
//           return token.token!==req.token
//       })
//       await req.user.save()
//       res.send()
//   }catch(e){
//       res.status(500).send()
//   }
// })

router.post('/users/logoutAll',auth,async(req,res)=>{
 try{ 
  req.user.tokens=[]
  await req.user.save()
  res.send()
  }catch(e){
      res.status(500).send()
  }
})

router.get('/users/booking/:id',auth,async function(req,res){
 // const _id = req.params.id
  //console.log(_id)
  const user = req.user
  try{
    const screen =await Screen.findOne({_id:req.params.id})
    //console.log(screen)
    
    //console.log(movie)
    const tempval = screen.movieInfo.filter((arr)=>{return arr.name=req.query.mname})[0]
    
    const seatAvailable = (tempval.seatInfo-tempval.reservedSeats)
    const numberOfTicket = parseInt(req.query.tickets)
    if(seatAvailable<numberOfTicket){
      res.status(400).send({error:'This amount of tickets are not available'})
    }else{
    user.ticket=user.ticket+numberOfTicket
    user.bookingStatus=true
    tempval.reservedSeats=tempval.reservedSeats+numberOfTicket
    user.movieName=tempval.name
    user.mallId=req.params.id
    user.mallName=screen.theatreName
    await screen.save()
    await user.save()
    res.send('Ticket booked successfully')
    }
  }catch(e){
    res.status(400).send()
  }
})

router.get('/users/bookingInfo',auth,async(req,res)=>{
  if(req.user.movieName){const msg = 'There are '+req.user.ticket+' tickets are booked by '+req.user.name+' for '+req.user.movieName+' movie at'+req.user.mallName+'.'
  res.send(msg)}
  else{
    res.send(req.user.name+' has not booked any movie ticket yet')
  }
})

router.get('/users',auth,async(req,res)=>{
  res.send(req.user)
})

router.get('/users/cancelTicket',auth,async(req,res)=>{
  try{
    const user = req.user
  
  if(user.bookingStatus){
    console.log(user.mallId)
    const screen =await Screen.findOne({_id:user.mallId})
    console.log(screen)
    const tempval = screen.movieInfo.filter((arr)=>{return arr.name=user.movieName})[0]
    console.log(tempval)
    tempval.reservedSeats=tempval.reservedSeats-user.ticket
    user.ticket=0
    user.bookingStatus=false
    user.movieName=""
    user.mallId=null
    user.mallName=""
    await user.save()
    await screen.save()
    res.send(user)
  }else{
    res.status(400).send({error:'User has not book any movie'})
  }

}catch(e){
    res.status(400).send()
  }
})

module.exports=router