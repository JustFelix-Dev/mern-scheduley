import express from 'express';
import { createTask, getTask, getTasks, updateTask } from '../controllers/taskController';

const router = express.Router()

router.post('/create', createTask)
router.put('/:id', updateTask)
router.get(':id', getTask)
router.get('/', getTasks)

export default router
