import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express  from "express";
import mongoose from "mongoose";
import cors from 'cors';
import multer from "multer";
import {fileURLToPath} from 'url';
import path from "path";
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PORT = process.env.PORT

const app = express()
// Middlewares
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGOURL)
.then(()=>{
    app.listen(PORT , ()=>{
        console.log(`--Listening and Connected to DB: ${PORT}`)
    })
}).catch((err)=>{
    console.log(err)
})