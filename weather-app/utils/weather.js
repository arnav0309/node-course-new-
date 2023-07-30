const request = require('request')
const locationIq = require('./locationIq')
const weather = (longt,lat,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=d0f1f7ce7bc59c4ea2c68cbb402e9605&query='+lat+','+longt
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('There is error accessing the weather api!',undefined)
        }else if(response.body.error){
            callback('Unable to find location',undefined)
        }else{
            const data = response.body.current
            const msg= "It is currently "+data.temperature+ " degree celcius out.It feels like " +data.feelslike+ " degree celcius out there"
            callback(undefined,msg)
        }
    })
}

module.exports = weather