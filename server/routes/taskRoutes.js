import express from 'express';
import { createTask, updateTask,getTask,getTasks} from '../controllers/taskController.js';


const router = express.Router()

router.post('/create', createTask )
router.put('/:id', updateTask)
router.get(':id', getTask)
router.get('/', getTasks)

export default router
