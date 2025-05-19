const express =require("express")
 
const app =express();

app.get("/user",(req,res)=>{
   const id= req.params
    console.log(req.query)
    res.send("hi there")
})

// const userobj={
    //     firsrName:"Raushan",
    //     lastName:"Raj",
    //     age:25
    // }


app.listen(3333,()=>{console.log("server is listen now")})