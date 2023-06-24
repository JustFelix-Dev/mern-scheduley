import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "../services/api";
import { setTasks } from "../features/task/taskSlice";

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
                
              </main>
           </>
     );
}
 
export default Home;