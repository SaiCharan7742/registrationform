const express=require('express')
const mongoose=require('mongoose')
const path=require('path')
const port=3011
const app=express()


app.use(express.static(__dirname))
app.use(express.static(__dirname));
app.use(express.urlencoded({extended:true}))


mongoose.connect('mongodb://127.0.0.1:27017/students')
const db=mongoose.connection
db.once('open',()=>{
    console.log("Mongodb conncetion Succesfull")
})

const userSchema = new mongoose.Schema({
    reg_no:String,
    name:String,
    Email:String,
    Password:String
})

const Users=mongoose.model("data",userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'form.html'))
})

app.post('/post',async(req,res)=>{
    const{reg_no,name,Email,Password}=req.body
    const user=new Users({
        reg_no,
        name,
        Email,
        Password
    })
    await user.save()
    console.log(user)
    res.send("Form Submission Successful")
})

app.listen(port,()=>{
    console.log("Server started")
})
