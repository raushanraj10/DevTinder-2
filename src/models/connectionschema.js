const mongoose=require("mongoose")

const connectionSchema=mongoose.Schema({
    fromuserId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    touserId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    status:{
        type:String,
        require:true,
        enum:{
           value: ["ignored","interested","accepted","rejected"],
           message:`${value} valued not define`
        }
    }
},{timestamps:true})

const ConnectionModel=mongoose.model("ConnectionModel",connectionSchema)

module.exports=ConnectionModel