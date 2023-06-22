import jwt from "jsonwebtoken"
export const verifyToken = (req,res,next)=>{
   try{
     const token = req.cookies.token
     if(!token) return res.status(401).json({message: 'Unauthorized!'})
      jwt.verify(token, process.env.SECRET, ( err, user )=>{
        if(err){
            return res.status(401).json({message: 'Wrong Credentials!'})
        }
      return res.json({user})
      req.user = user
      })
   }
   catch(err){
       next(err)
   }
}