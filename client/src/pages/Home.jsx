import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "../services/api";
import { Link } from "react-router-dom";
import Task from "../components/Task";
import { setTasks } from "../features/task/taskSlice";

const Home = () => {
    const dispatch = useDispatch()
    
    useEffect(()=>{
    axios.get('/task').then((res)=>{
        dispatch(setTasks(res.data.tasks));
    })
    },[])
    
    const { tasks } = useSelector(( state,action)=> state.task)
    console.log(tasks)
    return ( 
           <>
    <Navbar/>
    <main>
    {
    tasks && (
    <div className="container">
            {
            tasks.map((task)=>(
              <Link key={task._id} to={`/task/${task._id}`}>
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