const express =require("express")
 
const app =express();

app.get("/getting",(req,res)=>{
    const userobj={
        firsrName:"Raushan",
        lastName:"Raj",
        age:25
    }
    res.send(userobj)
})




app.listen(3333,()=>{console.log("server is listen now")})