// Goal: Create method to get incomplete tasks
//
// 1. Define getTasksToDo method
// 2. Use filter to to return just the incompleted tasks (arrow function)
// 3. Test your work by running the script
// testing from MAC
const tasks = {
    tasks: [{
        text: 'Grocery shopping',
        completed: true
    },{
        text: 'Clean yard',
        completed: false
    }, {
        text: 'Film course',
        completed: false
    }],
    getTasksToDo(){
    //    const ans = this.tasks.filter((task)=>{
    //         return task.completed === false
    //     })
        //return ans
        return this.tasks.filter((task)=>task.completed === false) // same works as above three lines
    }
}


console.log(tasks.getTasksToDo())