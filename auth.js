const auth=(req,res,next)=>{
const password="xxxx";
    if(password==="xxxx")
        next();
    else
    res.status(401).send("authentication failed")
}
module.exports=auth