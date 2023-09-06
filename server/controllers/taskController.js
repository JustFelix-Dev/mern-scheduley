import dayjs from "dayjs";
import Task from "../models/Task.js";

export const createTask = async(req,res,next)=>{
   try{
       const { id } = req.user;
       const completionDate = new Date(req.body.date)
       const task = await Task.create({...req.body,userId:id, date:completionDate})
       return res.status(201).json({task: task});
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
      
        const { id } = req.params;
        const task = await Task.findById(id)
        return res.status(201).json({task})
 
    }
    catch(err){
        next(err)
    }
 }

 export const getTasks = async(req,res,next)=>{
    try{
        const type = req.query?.type
        const day = req.query?.day
        const { id } = req.user
        var maxDay , minDay
        if(day === 'today'){
            minDay = dayjs().format('YYYY-MM-DD')
            maxDay = dayjs().format('YYYY-MM-DD')
        }
        else if( day === 'seven'){
             minDay = dayjs().subtract(7,'day').format('YYYY-MM-DD')
             maxDay = dayjs().format('YYYY-MM-DD')
        }
        else if( day === 'thirty'){
            minDay = dayjs().subtract(30,'day').format('YYYY-MM-DD')
            maxDay = dayjs().format('YYYY-MM-DD')
        }

        if(type){
            var tasks = await Task.find({userId: id, type , ...(day && {date: {$lte: new Date(maxDay), $gte: new Date(minDay)}})})
        }
        else{
            var tasks = await Task.find({userId: id , ...(day && {date: {$lte: new Date(maxDay), $gte: new Date(minDay)}})})
        }
        return res.status(201).json({tasks})
    }
    catch(err){
        next(err)
    }
 }

 export const deleteTask = async( req,res,next)=>{
     const {id} = req.params;
    try{
          const deletedTask =  await Task.findOneAndDelete({_id: id})
          if(!deletedTask){
           return res.status(401).json('Task Not Found!')
          }
             res.status(201).json("Task successfully deleted!")
      
    }catch(err){
        next(err)
    }
 }