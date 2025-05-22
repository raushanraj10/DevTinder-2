const express =require("express")
const auth =require("./auth")
const connectDB=require("./config/database")
const {ModelUser}=require("./models/schemas")
const validationSignUp=require("./utils/validation")
const bcrypt=require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt=require("jsonwebtoken")
const userauth=require("./utils/auth")
 
const app =express();
app.use(express.json())
app.use(cookieParser())

const USE_SAFE_DATA="firstName lastName age about skills"

// console.log("chl rha h")

app.get("/profile",userauth,async(req,res)=>{
 try{
    const loggedUser=req.loggedUserdata
  
    res.send(loggedUser)}
    catch(err){
        res.send("Error: "+err.message)
    }
})
app.post("/login",async (req,res)=>{
    const {emailId,password}=req.body
  
    const logger= await ModelUser.findOne({emailId:emailId})

    if(!logger)
    throw new Error("email not found")
   
    const checkpassword= await bcrypt.compare(password,logger.password)
    // console.log(checkpassword)

    if(checkpassword)
        throw new Error("password incorret please re enter your password")

    const token=await jwt.sign({_id:logger._id},"Devtinder2",{expiresIn:"1h"})
    console.log(token)

    res.cookie("token",token)
    res.send("login successfull")


})

app.post("/singup",async (req,res)=>{
    // const userObj={
    //     firstName:"Raushan",
    //     lastName:"Raj",
    //     age:45,
    //     emailId:"raushan@123",
    //     password:"1234"
    // }
    validationSignUp(req)

    const {firstName,lastName,age,gender,emailId,password,skills}=req.body

    console.log(password)
    const passwordHash=await bcrypt.hash(password,10)

    console.log(passwordHash)
    const user=new ModelUser({
        firstName,
        lastName,
        age,
        gender,
        emailId,
        skills,
        password:passwordHash,
    })
   
    await user.save();
  
    res.send("data of user saved")
})

app.get("/getuniqueuser",async (req,res)=>{
    const requestedemail=req.body.emailId
    console.log(requestedemail)

    const userprofile=await ModelUser.findOne({emailId:requestedemail})
    res.send(userprofile)
})

app.get("/getalluser",async (req,res)=>{
    // const requestedemail=req.body.emailId
    // console.log(requestedemail)

    const userprofile=await ModelUser.find({})
    res.send(userprofile)
})

app.delete("/deleteuser/:userid",async (req,res)=>{
    // const requestedemailforuser=req.body.emailId
    //userid se delete krne ka start kiy h
    const requstedidfordelete=req.params.userid
    // console.log(requstedidfordelete)
    // console.log(requstedidfordelete)
    // const requestedidfordelete2=req.body.idfordelete
    const deletion=await ModelUser.findByIdAndDelete({_id:requstedidfordelete})
    // const deletion2=await ModelUser.findByIdAndDelete({_id:requestedidfordelete2})

    res.send("deleted")

})

app.patch("/updateuser/:useridforupdate",userauth,async (req,res)=>{
   const userid=req.params.useridforupdate;
   const data=req.body
   await ModelUser.findByIdAndUpdate({_id:userid},data,{returnDocument:"after",runValidators:true})
   res.send("updated")
})

app.use("/",(err,req,res,next)=>{
    if(err)
        res.send("Error: "+err.message)
})
connectDB().then(()=>{
    console.log("server conncted")
app.listen(3333,()=>{console.log("server is listen now")})
})
.catch(()=>{
console.error("not connected")
})
