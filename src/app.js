const express =require("express")
const auth =require("../auth")
const connectDB=require("./config/database")
const {ModelUser}=require("./models/schemas")
const validationSignUp=require("./utils/validation")
const bcrypt=require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt=require("jsonwebtoken")
const userauth=require("./utils/auth")
const authRouter=require("./routes/auth")
const profileRouter=require("./routes/profile")
const requestRouter = require("./routes/request")
const cors=require("cors")
const userRouter = require("./routes/User")


const app =express();
app.use(express.json())
app.use(cookieParser())
 app.use(cors({origin:"http://localhost:5173",credentials:true}))


const USE_SAFE_DATA="firstName lastName age about skills"

// console.log("chl rha h")
app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)




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

app.post("/sendrequest",userauth,(req,res)=>{
    console.log("sending request")
    const logger=req.loggedUserdata
    res.send(logger.firstName)
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
