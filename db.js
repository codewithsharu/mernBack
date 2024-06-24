const mongoose = require('mongoose')
const connectToMongo=()=>{
try{


    mongoose.connect("mongodb+srv://trydatabase69:<password>@cluster0.xqw036f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

console.log("connected to db");

}catch(error){
    console.log("Network error")
}
}
connectToMongo()
module.exports = connectToMongo;
