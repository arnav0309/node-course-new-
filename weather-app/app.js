const request = require('request')
const url = 'http://api.weatherstack.com/current?access_key=d0f1f7ce7bc59c4ea2c68cbb402e9605&query=bhabua'
request({url:url,json:true}, (error,response) =>{
    //const data = JSON.parse(response.body)
    //console.log(response.body.current)
    
     if(error){
        console.log("There is error accessing the weather api!")
     }else if(response.body.error){
        console.log("Unable to find location")
     }
     else{
        const data = response.body.current
        console.log("It is currently "+data.temperature+" degree out.There is "+data.weather_descriptions+" weather")
    }
})