import jwt from "jsonwebtoken"
export const verifyToken = (req,res,next)=>{
   try{
     const token = req.cookies.token.token
     if(!token) return res.status(401).json({message: 'Unauthorized!'})
      jwt.verify(token, process.env.SECRET, ( err, user )=>{
        if(err){
            return res.status(401).json({message: 'Wrong Credentials!'})
        }
              req.user = user
      })
      next()
   }
   catch(err){
       next(err)
   }
}