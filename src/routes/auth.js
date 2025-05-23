const express=require("express")
const {ModelUser}=require("../models/schemas")
const validationSignUp=require("../utils/validation")
const bcrypt=require("bcrypt")



const authRouter=express.Router();


authRouter.post("/login",async (req,res)=>{
    const {emailId,password}=req.body
  
    const logger= await ModelUser.findOne({emailId:emailId})

    if(!logger)
    throw new Error("email not found")
   
    // const checkpassword= await bcrypt.compare(password,logger.password)
    const checkpassword=logger.validatepassword(password)
    // console.log(checkpassword)

    if(!checkpassword)
        throw new Error("password incorret please re enter your password")

    // const token=await jwt.sign({_id:logger._id},"Devtinder2",{expiresIn:"1h"})
    const token=await logger.gettoken()

    res.cookie("token",token)
    res.send("login successfull")


})

authRouter.post("/singup",async (req,res)=>{
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


authRouter.post("/logout",async (req,res)=>{
    res.cookie("token",null)
    console.log(req.cookie)
    res.send("logout successfully")
})


module.exports=authRouter