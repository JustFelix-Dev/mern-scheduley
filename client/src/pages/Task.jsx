import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../services/api";
import { useParams } from "react-router-dom";
import { setTask } from "../features/task/taskSlice";

const Task = () => {

    const { id } = useParams();
    const [ currentTask , setCurrentTask ] = useState(null)
    const dispatch = useDispatch()

    useEffect(()=>{
        async function fetchTask() {
            await axios.get(`/task/${id}`)
            .then((res)=>{
                setCurrentTask(res.data.task)
                dispatch(setTask(res.data.task))
            })
        }
        fetchTask()
    },[id,dispatch])

    return (  
            <>
              <div className="task">
                    
              </div>
             
            </>
    );
}
 
export default Task;