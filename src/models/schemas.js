const mongoose = require("mongoose")

const userSchema= new mongoose.Schema({
 
    firstName:{
        type:String
    },
 
 
    lastName:{
        type:String
    },
 
 
    emailId:{
        type:String
    },
 
 
    age:{
        type:Number
    },
 
 
    password:{
        type:String
    },
     skills:{
        type:[String]
    },
 
 
})

const ModelUser=mongoose.model("ModelUser",userSchema)
module.exports={ModelUser}