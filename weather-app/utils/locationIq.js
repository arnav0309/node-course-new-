const request = require('request')

const locationIq=(address,callback)=>{
    const url = 'https://eu1.locationiq.com/v1/search?key=pk.e3910b23d4923d1ad7d85bcd66d526ef&q='+address+'&format=json'
    request({url:url,json:true},(error,response)=>{
       if(error){
          callback('Unable to connect with location service!',undefined)
       }else if(response.body.error){
          callback(response.body.error,undefined)
       }else{
          callback(undefined,{
             longtitude:response.body[2].lon,
             latitude: response.body[2].lat,
             location:response.body[2].display_name
          })
       }
    })
 }
 module.exports = locationIq