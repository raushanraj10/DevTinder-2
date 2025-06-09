const express=require("express")
const userauth=require("../utils/auth");
const { validationprofiledata } = require("../utils/validation");
const bcrypt=require("bcrypt")
const validatepassword=require("../models/schemas")
const {ModelUser}=require("../models/schemas")



const profileRouter=express.Router();


profileRouter.patch("/profile/edit",userauth,async (req,res)=>{
    try{
        // console.log("ahsjdfh  ")
        // if(!validationprofiledata(req))
        //     throw new Error("not able to edit provide right input")
        const loggedUser=req.loggedUserdata
    //    console.log(loggedUser)
        Object.keys(req.body).forEach((ele)=>{
            // console.log(loggedUser[ele])
            // console.log(req.body[ele])
            loggedUser[ele]=req.body[ele]
            // console.log(loggedUser)
        })
         await loggedUser.save()
        // res.json({message:`${loggedUser.firstName},your profile updated `,data:`${loggedUser}`})
        // res.send({message:`${loggedUser.firstName} your profile updated`,data:`${loggedUser}`})
        res.send(loggedUser)

    }catch(err){
        res.send("Error: "+err.message)
    }
})

profileRouter.get("/profile/view",userauth,async(req,res)=>{
 try{
 const loggedUser=req.loggedUserdata
//   console.log(loggedUser)
 res.send(loggedUser)}
 catch(err){
 res.send("Error: "+err.message)
}
})


profileRouter.patch("/profile/password",userauth,async (req,res)=>{
    const loggedUser=req.loggedUserdata
    // console.log("fjsl")
    const {oldpassword,newpassword}=req.body
    // console.log(loggedUser)
    const checkingOldPassword=await loggedUser.validatepassword(oldpassword)
    // console.log(checkingOldPassword)
    if(!checkingOldPassword)
        throw new Error("password not match")
    const passwordhash=await bcrypt.hash(newpassword,10)
    loggedUser.password=passwordhash;
    //console.log(loggedUser)
    await loggedUser.save();
    //const updatedPwd=await ModelUser.findByIdAndUpdate(loggedUser._id,{password:passwordhash})
    res.send("password change successfully done")

})
module.exports=profileRouter