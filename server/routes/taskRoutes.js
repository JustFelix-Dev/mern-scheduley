import express from 'express';
import { createTask, updateTask,getTask,getTasks, deleteTask} from '../controllers/taskController.js';
import { verifyToken } from '../middleware/verify.js';

const router = express.Router()

router.post('/create', verifyToken, createTask )
router.put('/:id',verifyToken, updateTask)
router.get('/:id', verifyToken,  getTask)
router.get('/', verifyToken, getTasks)
router.delete('/delete/:id',verifyToken,deleteTask)

export default router
