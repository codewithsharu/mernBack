const connectToMongo = require("./db");
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json())
app.use('/auth/stripe',require("./routes/stripe"));
app.use('/auth/user',require("./routes/user"));
app.get('/',(req,res)=>{
    console.log("hello");
    res.send("hello")
})
app.listen(5000);
connectToMongo