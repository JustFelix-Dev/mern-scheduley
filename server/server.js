import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express  from "express";
import mongoose from "mongoose";
import cors from 'cors';
import multer from "multer";
import { fileURLToPath } from 'url';
import path from "path";
dotenv.config()

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PORT = process.env.PORT

// Middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// file configuration
app.use('/assets', express.static(path.join(__dirname , 'public/assets')));
// multer configuration
const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, 'public/assets')
    },
    filename: function(req,file,cb) {
        const picturePath = new Date().toISOString().replace(/:/g , '-') + file.originalname
        req.body.picturePath = picturePath
        cb(null , picturePath)
    }
})
 const upload = multer({ storage })

mongoose.connect(process.env.MONGOURL)
.then(()=>{
    app.listen(PORT , ()=>{
        console.log(`--Listening and Connected to DB: ${PORT}`)
    })
}).catch((err)=>{
    console.log(err)
})