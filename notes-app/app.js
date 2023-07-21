 //const validator = require('validator')
 const chalk = require('chalk')
const { describe, string, argv } = require('yargs')
 //console.log(validator.isEmail('20195@iiitv'))
//import chalk from 'chalk';
const yargs = require('yargs')

// const var1 = "Success"
// console.log(chalk.red.bold(var1))
// console.log(process.argv)
yargs.command({  // for command line arguments
    command:'add',
    describe: 'add a note', //description of commands
    builder: {
        title:{
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'Note-Body',
            demandOption: true,
            type:'string'
        }
    },
    handler: function() {
        console.log('Title: '+argv.title)
        console.log('Body: '+argv.body)
    }
})
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    handler: function(){
        console.log("Removing a note")
    }
})
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler: function(){
        console.group("Listing of notes")
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: function(){
        console.log("Reading a note")
    }
})
yargs.parse()
//console.log(yargs.argv)



























// const fs = require('fs')
// fs.writeFileSync('node.txt','file created by node!.')
// fs.appendFileSync('node.txt',' this is the new appended part')

// const add=require('./utills.js')
// const sum=add(2,4)
// console.log(sum)
// const fun = require('./notes.js')
// //const ans=fun()
// console.log(fun())