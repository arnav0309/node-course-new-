const fs = require('fs')

// const book={
//     title:'test_book',
//     author:'Anand'
// }

// const bookJson = JSON.stringify(book) // json object to json string

// fs.writeFileSync('1-json.json',bookJson)
// console.log(bookJson)

// const parseData = JSON.parse(bookJson)
// console.log(parseData.author)


// const bufferData = fs.readFileSync('1-json.json')
// const dataJson = bufferData.toString()
// const data = JSON.parse(dataJson)
// console.log(data.author)


//tasks  
//1. Load and parse the json data
//2.change the name and age
//3.stringify the changed object and overwrite the original data
//4.test work by viewing data in json file

const temp = fs.readFileSync('1-json.json')
const tempUsabledata = temp.toString()
const tempusablejson = JSON.parse(tempUsabledata)
//console.log(tempusablejson.name)
tempusablejson.name='Anand'
tempusablejson.age=23
const newUser = JSON.stringify(tempusablejson)
fs.writeFileSync('1-json.json',newUser)
