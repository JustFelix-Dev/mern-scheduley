import Task from "../models/Task.js";

export const createTask = async(req,res,next)=>{
   try{
       const { id } = req.user;
       const completionDate = new Date(req.body.date)
       const task = await Task.create({...req.body,userId:id, date:completionDate})
       return res.status(201).json(task);
   }
   catch(err){
       next(err)
   }
}

export const updateTask = async(req,res,next)=>{
    try{
       const { id } = req.params;
       const task = await Task.findByIdAndUpdate( id, {...req.body}, {new: true})
       return res.status(201).json({task})
    }
    catch(err){
        next(err)
    }
 }

 export const getTask = async(req,res,next)=>{
    try{
 
    }
    catch(err){
        next(err)
    }
 }

 export const getTasks = (req,res,next)=>{
    try{
 
    }
    catch(err){
        next(err)
    }
 }