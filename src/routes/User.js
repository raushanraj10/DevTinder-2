const express=require("express")
const userauth = require("../utils/auth")
// const { Connection } = require("mongoose")
const ConnectionModel = require("../models/connectionschema")
const { ModelUser } = require("../models/schemas")
const { ChangeStream } = require("mongodb")
const userRouter=express.Router()


const USER_SAFE_DATA="_id firstName lastName age about gender skills photourl";



userRouter.get("/feed",userauth,async(req,res)=>{
    // console.log("hdfuoi")
    const logger=req.loggedUserdata
    // console.log(logger)
    const connectionRequest= await ConnectionModel.find({
        $or:[
            {fromuserId:logger._id},
            {touserId:logger._id}
        ]
    }).select("fromuserId touserId")

    const hideUser= new Set();
    connectionRequest.forEach((elem) => (
       [ hideUser.add(elem.fromuserId.toString()),
        hideUser.add(elem.touserId.toString())] 
    ));

    const allfeed=await ModelUser.find({
        $and:[
            {_id:{$nin:Array.from(hideUser)}},
            {_id:{$ne:logger._id}}
        ]
    }).select(USER_SAFE_DATA)
    // console.log(allfeed)
    res.send(allfeed)
})


userRouter.get("/user/request/recieved",userauth,async (req,res)=>{
    try{
        const logger=req.loggedUserdata
        // console.log(logger)

        const checkRecievedRequest=await ConnectionModel.find({
            touserId:logger._id,
            status:"interested"
        }).select("fromuserId").populate("fromuserId",USER_SAFE_DATA)

        if(!checkRecievedRequest)
            return res.send("there is no request recived by u")
        // console.log(checkRecievedRequest)

        // const senderprofile=await ModelUser.find({
        //     checkRecievedRequest.fromuserId
        // })
        // console.log(checkRecievedRequest)
        res.send(checkRecievedRequest)

    }catch(err){}
})

userRouter.get("/user/review/connection",userauth,async (req,res)=>{
    const logger=req.loggedUserdata
    // console.log(logger._id)
    const checkRequest=await ConnectionModel.find({
        $or:[{fromuserId:logger._id,status:"accepted"},
            {touserId:logger._id,status:"accepted"}
        ]
    }).populate("fromuserId",USER_SAFE_DATA).populate("touserId",USER_SAFE_DATA)
    
    if(!checkRequest)
        return res.send("there is no connection in ur profile")
    
    // const check = checkRequest.map((ele)=>{console.log(ele.fromuserId._id)})
    // console.log(" djsikfj")
    //   const checkin = checkRequest.map((ele)=>{console.log(ele.touserId._id)})

    // console.log(checkRequest.length)

    // const check=await ConnectionModel.find({fromuserId:logger._id,touserId:logger._id})
    // console.log(check.length)

    const data=checkRequest.map((ele)=>{
        if(ele.fromuserId._id.toString()===logger._id.toString()){
        //    { console.log(ele.fromuserId._id);
            return ele.touserId}
        // console.log(ele.touserId._id)
        return ele.fromuserId
    })
    // console.log(data.length)
    res.send(data)
})
module.exports=userRouter