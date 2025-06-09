const mongoose = require("mongoose")
const validator = require("validator")
const jwt =require("jsonwebtoken")
const bcrypt=require("bcrypt")

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
    },
    photourl:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2019/01/28/02/10/girl-taking-photo-3959468_1280.jpg"
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