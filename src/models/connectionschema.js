const mongoose=require("mongoose")
const { ModelUser } = require("./schemas")

const connectionSchema=mongoose.Schema({
    fromuserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:ModelUser,
        require:true
    },
    touserId:{
        type:mongoose.Schema.Types.ObjectId,
         ref:ModelUser,
        require:true,
    },
    status:{
        type:String,
        require:true,
        enum:{
           values:["ignored","interested","accepted","rejected"],
           message:`{VALUE} valued not define`
        }
    }
},{timestamps:true})

const ConnectionModel=mongoose.model("ConnectionModel",connectionSchema)

module.exports=ConnectionModel