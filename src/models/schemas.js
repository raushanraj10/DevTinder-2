const mongoose = require("mongoose")
const validator = require("validator")
const jwt =require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userSchema= new mongoose.Schema({
 
    firstName:{
        type:String,
        required:true,
        uppercase:true
        // minLength:2,
    },

    lastName:{
        type:String,
        required:true,
         uppercase:true
        // minLength:2,
    },
 
 
    emailId:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
         if(!validator.isEmail(value))
            throw new Error("email id is not correct")
        },
    },
 
 
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0)
                throw new Error("Give Right Input Of Age")
        }
        // min:10,
    
        // max:50,
    },

    password: {
    type: String,
    required: true,
  },

     skills:{
        type:[String],
        default:["Reading"],
         uppercase:true,
    },
    about:{
        type:String,
        default:"this is default about for all",
         uppercase:true,
    },
    gender:{
        type:String,
        // validate(value)
        // {
        //     if(!["male","female,other"].includes(value))
        //         throw new Error("gender not available")
        // },
        // validate(value)
        // {
        //     if(!(value==="Male"||value==="Female"||value==="Other"))
        //         throw new Error("gender not available")
        // },
    },
    photourl:{
        type:String,
        default:"https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
    },

 
 
},{timestamps:true})

userSchema.methods.gettoken=async function(){
 const token=jwt.sign({_id:this._id},"Devtinder2",{expiresIn:"1h"})
 return token;
}

userSchema.methods.validatepassword=async function(password){
    // console.log(password)
    //   console.log(this.password)
    // console.log("from validate password")
     const checkpassword= await bcrypt.compare(password,this.password)
    //  console.log(checkpassword)
     return checkpassword
}

const ModelUser=mongoose.model("ModelUser",userSchema)
module.exports={ModelUser}