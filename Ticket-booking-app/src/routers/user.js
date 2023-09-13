const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
const Screen = require('../models/screen')
const Booking = require('../models/booking')
const Payment = require('../models/payment')

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

router.post('/users/booking/:id',auth,async function(req,res){
 // const _id = req.params.id
  //console.log(_id)
  const user = req.user
  try{
    const screen =await Screen.findOne({_id:req.params.id})
    //console.log(screen)
    
    //console.log(movie)
    const tempval = screen.movieInfo.find((arr)=>{return arr.name===req.body.mname})
    //console.log(screen)
    let items = tempval.seatInfo.filter(item=>item.status.indexOf('available')!==-1)
   // console.log(screen)
    
    let numberOfTicket = parseInt(req.body.tickets)
    if(items.length>=numberOfTicket){
      let val=0
      let tostore=[]
      while(val<numberOfTicket){
        tostore.push(items[val].seatNumber)
        items[val].status='booked'
        val++
      }
     // console.log(screen)
      await screen.save()
      let totalmoney = numberOfTicket*tempval.ticketPrice
      let booking1=new Booking({
        booking_id:Date.now(),
        seatInfo:tostore
      })
      await booking1.save()
      user.bookingInfo.push(booking1._id)
      let payment1=new Payment({
        payment_id:(Date.now()*53),
        paidStatus:'Paid',
        totalPaid:totalmoney
      })
      await payment1.save()
      user.paymentInfo.push(payment1._id)
      const obj = {Location:screen.theatreLocation,movieName:tempval.name,mallName:screen.theatreName,bookedSeats:tostore}
      user.bookedMovieInfo.push(obj)
      //user.mallName.push(screen.theatreName)
      await user.save()
      
      //console.log('sucess')
    }
    else{ //console.log('not')
    res.send('Not Enough Seat Available')
  }
    //const seatAvailable = (tempval.seatInfo-tempval.reservedSeats)
    
    // if(seatAvailable<numberOfTicket){
    //   res.status(400).send({error:'This amount of tickets are not available'})
    // }else{
    // user.ticket=user.ticket+numberOfTicket
    // user.bookingStatus=true
    // tempval.reservedSeats=tempval.reservedSeats+numberOfTicket
    // user.movieName=tempval.name
    // user.mallId=req.params.id
    // user.mallName=screen.theatreName
    // await screen.save()
    // await user.save()


    res.send('Ticket booked successfully')
    //}
  }catch(e){
    res.status(400).send()
  }
})

router.get('/users/bookingInfo',auth,async(req,res)=>{
  if(req.user.bookedMovieInfo.length!==0){

  res.send(req.user.bookedMovieInfo)}
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