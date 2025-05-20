const express =require("express")
const auth =require("./auth")
const connectDB=require("./config/database")
const {ModelUser}=require("./models/schemas")
 
const app =express();
app.use(express.json())

app.post("/singup",async (req,res)=>{
    // const userObj={
    //     firstName:"Raushan",
    //     lastName:"Raj",
    //     age:45,
    //     emailId:"raushan@123",
    //     password:"1234"
    // }
    console.log(req.body)
    const user=new ModelUser(req.body)
    
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

app.patch("/updateuser/:useridforupdate",async (req,res)=>{
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
