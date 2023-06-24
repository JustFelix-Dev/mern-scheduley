import dayjs from "dayjs";
import Task from "../models/Task.js";

export const createTask = async(req,res,next)=>{
   try{
       const { id } = req.user;
       const completionDate = new Date(req.body.date)
       const task = await Task.create({...req.body,userId:id, date:completionDate})
       return res.status(201).json({task : task});
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
        var type = req.query?.type
        var day = req.type?.day
        const { id } = req.user;
        var maxDay , minDay;
        if(day === 'Today'){
            minDay = dayjs().format('YYYY-MM-DD')
            maxDay = dayjs().format('YYYY-MM-DD')
        }
        else if( day === 'Seven'){
             minDay = dayjs().subtract(7,'day').format('YYYY-MM-DD')
             maxDay = dayjs().format('YYYY-MM-DD')
        }
        else if( day === 'Thirty'){
            minDay = dayjs().subtract(30,'day').format('YYYY-MM-DD')
            maxDay = dayjs().format('YYYY-MM-DD')
        }

        if(type){
            var tasks = await Task.find({userId: id, type , ...(day && {date: {$lte: new Date(max), $gte: new Date(min)}})})
        }
        else{
            var tasks = await Task.find({userId: id , ...(day && {date: {$lte: new Date(max), $gte: new Date(min)}})})
        }
        return res.status(201).json({tasks})
    }
    catch(err){
        next(err)
    }
 }