 //const validator = require('validator')
 const chalk = require('chalk')
 //console.log(validator.isEmail('20195@iiitv'))
//import chalk from 'chalk';
const yargs = require('yargs')
const notes = require('./notes.js')

// const var1 = "Success"
// console.log(chalk.red.bold(var1))
// console.log(process.argv)
yargs.command({  // for command line arguments
    command:'add',
    describe: 'add a note', //description of commands
    builder: { // this is object in which we can add all these option 
        title:{
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'Note-Body',
            demandOption: true,// you have to provide it run command properly
            type:'string'
        }
    },
    handler(argv) {
        // console.log('Title: '+argv.title)
        // console.log('Body: '+argv.body)
        notes.addNotes(argv.title,argv.body)
    }
})
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        //console.log("Removing a note")
        notes.removeNote(argv.title)
    }
})
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler(){
        notes.listNotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder:{
        title:{
            describe:'Note ttle',
            demandOption:true,
            type:'string'
        }
        
    },
    handler(argv){
        notes.readNote(argv.title)
        //console.log("Reading a note")
    }
})
yargs.parse() // parsing the arguments above
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