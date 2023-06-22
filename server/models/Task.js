import mongoose from "mongoose";

const TaskSchema = mongoose.Schema({
      userId: {
        type: String,
        required: true
      },
      type: {
        type: String,
        enums: ['General','Work','Ideas','Meeting','Shopping','Payment'],
        default: 'General'
      },
      status: {
        type: String,
        enums: ['pending','completed'],
        default: 'completed'
      },
       name: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        required:true
      },
      time: {
        type: String,
        required: true
      }

},{timestamps: true})

export default mongoose.model('task', TaskSchema)