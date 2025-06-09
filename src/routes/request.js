const express =require("express")
const userauth=require("../utils/auth");
const { ModelUser } = require("../models/schemas");
const ConnectionModel = require("../models/connectionschema");

const requestRouter=express.Router();

requestRouter.post("/request/send/:status/:touserId",userauth,async (req,res)=>{
    try{
        // console.log("fhs")
    const fromuserId=req.loggedUserdata._id
    // console.log(touserId.toString())
     const {status,touserId}=req.params
     console.log(touserId.toString())
     if(fromuserId.toString()===touserId.toString())
        return  res.status(401).send("u cant't send request to urself")
    //  console.log(touserId)
    //  const loggeduser=req.loggedUserdata
     const validatetouserId=await ModelUser.findById({_id:touserId})
    //  console.log(validatetouserId)
     if(!validatetouserId)
     throw new Error("id not correct")

     const validstatus=["interested","ignored"]
     if(!validstatus.includes(status))
     throw new Error("status not valid")
    //  console.log(status)
     const isexitconnetion=await ConnectionModel.findOne({
        $or:[
            {fromuserId,touserId,},
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
    // console.log(connectionRequest)
    await connectionRequest.save()

    // const data =await ConnectionModel.find({
    //     touserId:
    // })
    
    res.send("request sended and waiting for response")

    }
    catch(err){
        res.send("sending request failed"+err.message)
    }
})


requestRouter.post("/request/review/:status/:requestId",userauth,async (req,res)=>{
    try{
        const logger = req.loggedUserdata;

        const {status,requestId}=req.params;
        // console.log(requestId)
        // console.log(logger._id.toString())
        const allowedStatus=["accepted,rejected"];
        if(!allowedStatus)
            return res.send("request not valid")
        const checkRequest=await ConnectionModel.findOne({
            _id:requestId,
            touserId:logger._id.toString(),
            status:"interested"
        })

        if(!checkRequest)
            return res.send("there is no such request")
        // console.log(checkRequest)
        checkRequest.status=status
        await checkRequest.save();
        res.send(status+"request sended to request id"+requestId)
    }
    catch(err){
        res.send("Error: "+err.message)
    }
})

module.exports=requestRouter