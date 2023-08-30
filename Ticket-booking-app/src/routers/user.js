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
    const seatAvailable = (screen.seatInfo-screen.reservedSeats)
    const numberOfTicket = parseInt(req.query.tickets)
    if(seatAvailable<numberOfTicket){
      res.status(400).send({error:'This amount of tickets are not available'})
    }else{
    user.ticket=user.ticket+numberOfTicket
    user.bookingStatus=true
    screen.reservedSeats=screen.reservedSeats+numberOfTicket
    user.movieName=screen.name
    await screen.save()
    await user.save()
    res.send('Ticket booked successfully')
    }
  }catch(e){
    res.status(400).send()
  }
})

router.get('/users/bookingInfo',auth,async(req,res)=>{
  if(req.user.movieName){const msg = 'There are '+req.user.ticket+' tickets are booked by '+req.user.name+' for '+req.user.movieName+' movie.'
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
    const screen =await Screen.findOne({name:user.movieName})
  if(user.bookingStatus){
    screen.reservedSeats=screen.reservedSeats-user.ticket
    user.ticket=0
    user.bookingStatus=false
    user.movieName=""
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