const locationIq = require('./utils/locationIq')
const weather = require('./utils/weather')
// const url = 'http://api.weatherstack.com/current?access_key=d0f1f7ce7bc59c4ea2c68cbb402e9605&query=bhabua'
// request({url:url,json:true}, (error,response) =>{
//     //const data = JSON.parse(response.body)
//     //console.log(response.body.current)
    
//      if(error){
//         console.log("There is error accessing the weather api!")
//      }else if(response.body.error){
//         console.log("Unable to find location")
//      }
//      else{
//         const data = response.body.current
//         console.log("It is currently "+data.temperature+" degree out.There is "+data.weather_descriptions+" weather")
//     }
// })

// const locUrl = 'https://eu1.locationiq.com/v1/search?key=pk.e3910b23d4923d1ad7d85bcd66d526ef&q=bhabua,bihar,india&format=json'
// request({url:locUrl,json:true},(error,response)=>{
//    if(error){
//       console.log("Unable to connect with location service!")
//     }else if(response.body.error) console.log(response.body.error)
//    else {
//       //console.log(response.body[2])
//       const longtitude = response.body[2].lon
//       const latitude = response.body[2].lat
//       console.log(latitude,longtitude)
//    }
// })

var address = process.argv[2]
if(!address) return console.log("Please Provide a address")




locationIq(address,(error,data)=>{
   if(error) return console.log(error)

   weather(data.longtitude,data.latitude,(error,weatherData)=>{
      if(error) return console.log(error)

      console.log(data.location)
     
      console.log(weatherData)
   })
})

