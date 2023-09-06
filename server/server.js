import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express  from "express";
import mongoose from "mongoose";
import cors from 'cors';
import multer from "multer";
import { fileURLToPath } from 'url';
import path from "path";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { signUp } from "./controllers/userController.js";
import cloudinary from "./uploadImages.js";




dotenv.config()

const app = express()

const PORT = process.env.PORT


// Middlewares
app.use(express.json())
app.use(cors({origin:'http://localhost:5173', credentials:true}))
app.use(cookieParser())
// app.use('/assets', express.static(path.join(__dirname , 'public/assets')));

// file configuration
// multer configuration
// const storage = multer.diskStorage({
//     destination: function(req,file,cb) {
//         cb(null, 'public/assets')
//     },
//     filename: function(req,file,cb) {
//         const picturePath = new Date().toISOString().replace(/:/g , '-') + file.originalname
//         req.body.picturePath = picturePath
//         cb(null , picturePath)
//     }
// })
//  const upload = multer({ storage })



// Define a route for file uploads
const photoMiddleWare = multer({
    storage: multer.memoryStorage()
  }).single('picture');

//  Routes
   app.use('/auth/signup', photoMiddleWare, signUp)
  app.use('/auth', userRoutes )
  app.use('/task', taskRoutes )
//  global errors
app.use((err,req,res,next)=>{
    const status = err.status || 500
    const message = err.message || 'Something went wrong!'
    return res.status(status).json({message})
})

mongoose.connect(process.env.MONGOURL)
.then(()=>{
    app.listen(PORT , ()=>{
        console.log(`--Listening and Connected to DB: ${PORT}`)
    })
}).catch((err)=>{
    console.log(err)
})