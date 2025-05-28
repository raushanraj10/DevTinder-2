const express =require("express")
const userauth=require("../utils/auth");
const { ModelUser } = require("../models/schemas");
const ConnectionModel = require("../models/connectionschema");

const requestRouter=express.Router();

requestRouter.post("/request/send/:status:/touserId",userauth,async (req,res)=>{
    try{
        console.log("fhs")
    const fromuserId=req.loggedUserdata._id
     const {status,touserId}=req.params
    //  const loggeduser=req.loggedUserdata
     const validatetouserId=ModelUser.findById({_id:touserId})
     console.log(_id)
     if(!validatetouserId)
     throw new Error("id not correct")

    //  const validstatus=["interested","ignored"]
    //  if(!validstatus.includes(status))
    //  throw new Error("status not valid")

     const isexitconnetion=await ConnectionModel.findOne({
        $or:[
            {fromusetId,touserId},
            {fromuserId:touserId,touserId:fromuserId}
        ]
     })
     if(isexitconnetion)
        throw new Error("connection already sent or received by ur account")
    const connectionRequest=new ConnectionModel({
        fromuserId,
        touserId,
        status
    })
    await connectionRequest.save()
    
    res.send("request sended and waiting for response")



    }
    catch(err){
        res.send("sending request failed")
    }
    

})

module.exports=requestRouter