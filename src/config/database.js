const mongoose=require("mongoose")

const connectDB= async()=>{
    mongoose.connect("mongodb+srv://namasteyDev:5ODfPUF3kbZJQmGa@cluster0.jcj6rmy.mongodb.net/DevTinder_2")

}
module.exports=connectDB