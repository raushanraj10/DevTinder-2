const express =require("express")
 
const app =express();
app.use((req,res)=>{
    res.send("server started")
})

app.listen(3333,()=>{console.log("server is listen now")})