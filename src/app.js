const express =require("express")
 
const app =express();

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