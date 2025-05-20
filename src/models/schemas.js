const mongoose = require("mongoose")
const validator = require("validator")

const userSchema= new mongoose.Schema({
 
    firstName:{
        type:String,
        required:true,
        // minLength:2,
    },

    lastName:{
        type:String,
        required:true,
        // minLength:2,
    },
 
 
    emailId:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true,
        // validate(value){
        //  if(!validator.isEmail(value))
        //     throw new Error("email id is not correct")
        // },
    },
 
 
    age:{
        type:Number,
        // min:10,
        // max:50,
    },
    password:{
        type:String
    },
     skills:{
        type:[String]
    },
    about:{
        type:String,
        default:"this is default about for all"
    },
    gender:{
        type:String,
        // validate(value)
        // {
        //     if(!["male","female"].includes(value))
        //         throw new Error("gender not available")
        // },
        validate(value)
        {
            if(!(value==="male"||value==="female"))
                throw new Error("gender not available")
        },
    }
 
 
},{timestamps:true})

const ModelUser=mongoose.model("ModelUser",userSchema)
module.exports={ModelUser}