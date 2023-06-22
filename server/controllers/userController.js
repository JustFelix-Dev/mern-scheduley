  import bcrypt from 'bcrypt';
  import jwt from 'jsonwebtoken';
  import taskuser from '../models/User.js';
export const signUp = async( req,res,next )=>{
  try{

     const { name,email,password,picturePath } = req.body;
     const salt = await bcrypt.genSalt()
     const hashed = await bcrypt.hash(password, salt)
     const user = await taskuser.create({name,email,password:hashed,picturePath})
     return res.status(201).json({savedUser : user})

  }
  catch(err){
    next(err)
  }
}

export const logIn = async( req,res,next )=>{
    try{
        const { email,password } = req.body;
        const isUser = await taskuser.findOne({email})
        if(!user) return res.status(404).json('User not found!')
        const isMatched = await bcrypt.compare(password, isUser.password)
        if(!isMatched){
          return res.status(401).json('Wrong Credentials!')
        }
        const token = jwt.sign({id:_id}, process.env.SECRET)

    }
    catch(err){
      next(err)
    }
  }