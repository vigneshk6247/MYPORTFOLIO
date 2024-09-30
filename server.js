const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 4006
const app = express();
app.use(express.static(__dirname))
app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb://127.0.0.1:27017/portfolio')
const db = mongoose.connection
db.once('open',()=>{
    console.log("mongodb connection successful")
})

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    text:String
})
const Users = mongoose.model("data",userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})
app.post('/post', async (req,res)=>{
    const { name, email, text} = req.body;
    const user = new Users({
        name,
        email,
        text
    });
    await user.save();
    console.log(user);
    res.send("Form submission successful");
});

app.listen(port,()=>{
    console.log("server is running")
})