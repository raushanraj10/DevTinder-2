const express=require("express")
const {ModelUser}=require("../models/schemas")
const {validationSignUp}=require("../utils/validation")
const bcrypt=require("bcrypt")



const authRouter=express.Router();


authRouter.post("/login",async (req,res)=>{
    const {emailId,password}=req.body
    // console.log("from req body "+password)
    
  
    const logger= await ModelUser.findOne({emailId:emailId})

    if(!logger)
    res.status(401).send("invalid credentials")
    // console.log("from login api "+logger.password)
   
    // const checkpassword= await bcrypt.compare(password,logger.password)
    const checkpassword=await logger.validatepassword(password)
    // console.log(checkpassword)

    if(!checkpassword)
        return res.status(401).send("invalid credentialsnp")

    // const token=await jwt.sign({_id:logger._id},"Devtinder2",{expiresIn:"1h"})
    const token=await logger.gettoken()

    res.cookie("token",token)
    res.send(logger)


})

authRouter.post("/signup",async (req,res)=>{
    // const userObj={
    //     firstName:"Raushan",
    //     lastName:"Raj",
    //     age:45,
    //     emailId:"raushan@123",
    //     password:"1234"
    // }
    // validationSignUp(req.body)

    const {firstName,lastName,age,gender,emailId,password,skills,about}=req.body
    // console.log(typeof(req.body))
    // console.log(password)
    const passwordHash=await bcrypt.hash(password,10)

    // console.log(passwordHash)
    const user=new ModelUser({
        firstName,
        lastName,
        age,
        gender,
        emailId,
        skills,
        about,
        password:passwordHash,
    })
   
    await user.save();
  
    res.send("data of user saved")
})


authRouter.post("/logout",async (req,res)=>{
    res.cookie("token","",{ maxAge: 0,secure: true,})
    // console.log(req.cookies)
    res.send("logout successfully")
})


module.exports=authRouter