const cookieParser = require("cookie-parser")
const jwt =require("jsonwebtoken")
const {ModelUser}=require("../models/schemas")
// const cookieParser=require(cookieParser)


const userauth= async (req,res,next)=>{
   const {token}=req.cookies
    
    const decoderandcompare=await jwt.verify(token,"Devtinder2")
  
    if(!decoderandcompare)
        throw new Error("token not matches")
    const {_id}=decoderandcompare

     const gettinginfo=await ModelUser.findOne({_id})
     req.loggedUserdata=gettinginfo
    
    next()
}

module.exports=userauth