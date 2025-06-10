const validator=require("validator")

const validationSignUp=(req)=>{

  const {firstName,lastName,emailId,age,password,skills}=req.body
  if(firstName.length<2||lastName<2)
  throw new Error("length of name should be greater than 2")
  
  if(!validator.isEmail(emailId))
    throw new Error("email id is not correct")
  console.log(age)

  if(!(age>0))
  throw new Error("age not correct age must be greater than zero")

  if(!(validator.isStrongPassword(password)))
    throw new Error("password not strong -> \n password must contain: \n { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }")
 
  if(skills&&!(skills.length<11))
    throw new Error("only 10 skills can be added")


}

const validationprofiledata=(req)=>{
  console.log(req)
  // console.log("juksfhdkjh")
  if(!req)
  throw new Error("nothing get any element to update")
  const allowedchange=["_id,firstName","lastName","age","gender","about","skills","photourl"]
  const isallowed=Object.keys(req.body).every((elem)=>allowedchange.includes(elem))
    console.log(req.body)
    console.log(isallowed)
    return isallowed
  
}
module.exports={validationprofiledata,validationSignUp}