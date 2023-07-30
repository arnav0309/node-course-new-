//   Object property shorthand


const name = 'anand'
const userAge=22
const user={
    //name:name,
    name,//as we have declared above we can just name the same
    age:userAge,
    location:'bhabua'
}
console.log(user.name)

//  Object destructuring
//when you have a object and you try to access property from it

const product={
    label:'Red notebook',
    price:3,
    stock:201,
    rating:4.3,
    salePrice:undefined
}
// const label=product.label
// const stock=product.stock
// const {label:productLabel,stock,rating=5}=product //we can also rename the variable using destructural property
// console.log(productLabel)
// console.log(stock)
// console.log(rating)// As rating is not in product object but it is not give any error. it justreturn undefined.

const transaction=(type,{label,stock,price})=>{
    console.log(type,label,stock)
}

transaction('order',product)