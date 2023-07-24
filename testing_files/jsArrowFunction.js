// const temp1 = function(x){
//     return x*x
// }
// const temp1 = (x)=>{
//     return x*x
// }

// const temp1=(x)=>x*x
// console.log(temp1(10))

const event={
    name:'Birthday party',
    guestList:['an','ana','anand'],
    printGuestList(){
        console.log('Guest List For '+this.name)
        this.guestList.forEach((guest)=>{ // arrow function don't bind their this value
            console.log(guest+' is attending '+this.name)
        })
    }
}
event.printGuestList()