
const fs = require('fs')
const chalk = require('chalk')

///////////////////////////////////////////   Adding a Note /////////////////////////////////////////

const getNotes=function(){
    return "Your Notes ..."
}
const addNotes = function(title,body){
    const notes = loadNotes()
    // const duplicateNotes = notes.filter(function(note){
    //     return note.title===title
    // })
    const duplicateNote = notes.find((note)=> note.title === title)
    if (!duplicateNote){
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
        console.log('New Note Added')
    }else{
        console.log('Note title already exits')
    }
    
    
}

const saveNotes = function(notes){
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJson) 
}

const loadNotes = function(){
    try{
        const bufferData = fs.readFileSync('notes.json')
        const dataJson = bufferData.toString()
        return JSON.parse(dataJson)
    }catch(e){
        return []
    }
}


///////////////////////////////////////////   remove a Note /////////////////////////////////////////
const removeNote = function(title){
    //console.log(title)
    const notes = loadNotes()
    const notestoKeep = notes.filter(function(note){
       return  note.title!=title
    })
    if(notestoKeep.length===notes.length){
        console.log("No note-title found")
        
    }else{
        saveNotes(notestoKeep)
        console.log("Notes removed Succesfully")
    }
    
}


const listNotes=()=>{
    const notes = loadNotes()
    console.log(chalk.inverse('My Notes'))
    notes.forEach((note)=>{
        console.log(note.title)
    })
}


const readNote =(title)=>{
    const notes = loadNotes()
    const note = notes.find((note)=> note.title===title)
    if(!note){
        console.log(chalk.red.inverse("Error"))
    }
    else{
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }
    
    
        
    
}

module.exports={ //to export to other file
    getNotes:getNotes,
    addNotes:addNotes,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote
}