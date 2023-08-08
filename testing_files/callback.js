const add = (callback)=>{
    setTimeout(()=>{
        callback(undefined,[1,3,4])
    },2000)
}


add((error,result)=>{
    if(error) return console.log(error)
    console.log(result)
})