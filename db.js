const mongoose = require('mongoose')
const connectToMongo=()=>{
try{


    mongoose.connect("mongodb+srv://divbajaj297:Divanshbajaj297$@stripe.i4tuvkc.mongodb.net/stripe");

console.log("connected to db");

}catch(error){
    console.log("Network error")
}
}
connectToMongo()
module.exports = connectToMongo;
