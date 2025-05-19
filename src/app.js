const express =require("express")
 
const app =express();

app.use("/admin",(req,res,next)=>{
    const password="xxxx";
    if(password==="xxxx")
        next();
    else
    res.status(404).send("authentication failed")
})
app.get("/admin/userprofile",(req,res)=>{
    res.send("user profile")
})
app.delete("/admin/deleteuser",(req,res)=>{
    res.send("user deleted")
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


app.listen(3333,()=>{console.log("server is listen now")})