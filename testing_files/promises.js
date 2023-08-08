const examplePromise=new Promise((resolve,reject)=>{
    setTimeout(() => {
        reject('Things went Wrong!')//any one of can called only once. below line will not execute as it is only take this line
        resolve([2,3,2])
    }, 2000)
})

examplePromise.then((result)=>{ //then allow to run function when things go well
    console.log('Success',result)
}).catch((error)=>{// if things not ge well
    console.log('Error',error)
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

// add(1, 2).then((sum) => {
//     console.log(sum)

//     add(sum, 5).then((sum2) => {
//         console.log(sum2)
//     }).catch((e) => {
//         console.log(e)
//     })
// }).catch((e) => {   
//     console.log(e)
// })

// callback chaining
add(1, 1).then((sum) => {
    console.log(sum)
    return add(sum, 4)
}).then((sum2) => {
    console.log(sum2)
}).catch((e) => {
    console.log(e)
})