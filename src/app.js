const express =require("express")
const auth =require("./auth")
 
const app =express();

// app.use("/admin",(req,res,next)=>{
//     const password="xxxx";
//     if(password==="xxxx")
//         next();
//     else
//     res.status(404).send("authentication failed")
// })
app.get("/admin/userprofile",auth,(req,res)=>{
    // throw ("g")

    // throw new Error("error in file")
    // ye error app.use()jo last me likha h usme show krega
    res.send("user profile")
})
app.delete("/admin/deleteuser",auth,(req,res)=>{
    try{
        // throw new Error("hfjkd")

        // throw("fdhisd")
        res.send("user deleted")
    }
    catch(err){
        res.send("ERROR: "+err.message)
    }
   
})

app.get("/user",(req,res,next)=>{
   const id= req.params
    console.log(req.query)
        next();
    res.send("hi there")
        //  next();
},(req,res)=>{
    console.log("dhf")
    res.send("hdfshf")
})

// const userobj={
    //     firsrName:"Raushan",
    //     lastName:"Raj",
    //     age:25
    // }

app.use("/",(err,req,res,next)=>{
    if(err)
        res.send("error: "+err.message)
})
app.listen(3333,()=>{console.log("server is listen now")})