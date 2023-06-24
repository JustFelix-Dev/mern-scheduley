import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "../services/api";
import { setTasks } from "../features/task/taskSlice";
import { Link } from "react-router-dom";
import Task from "../components/Task";

const Home = () => {
    const { tasks } = useSelector(()=> state.task)
  const dispatch = useDispatch()

 useEffect(()=>{
     axios.get('/task')
     .then((res)=>{
        dispatch(setTasks(res.data.tasks))
     })
    },[])

    return ( 
           <>
    <Navbar/>
    <main>
    {
    tasks && (
    <div className="container">
            {
            tasks.map((task)=>(
              <Link key={task.id} to={`${task.id}`}>
                   <Task task={task}/>
              </Link>  
            ))
            }
    </div>
        
    )
    }
    
    </main>
           </>
     );
}
 
export default Home;