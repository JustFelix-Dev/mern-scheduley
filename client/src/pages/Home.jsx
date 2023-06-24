import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "../services/api";
import { Link } from "react-router-dom";
import Task from "../components/Task";
import { setTasks } from "../features/task/taskSlice";

const Home = () => {
    const dispatch = useDispatch()
    const [ typeFilter,setTypeFilter ] = useState('')
    const [ dayFilter,setDayFilter ] = useState('')
    const types = ['General','Work','Ideas','Meetings','Shopping','Payments'];

    const days = [
        {label:"Today", value:'today'},
        {label:"Last Seven", value:'seven'},
        {label:"Last Thirty", value:'thirty'}
    ]
    
    useEffect(()=>{
    axios.get(`/task?type=${typeFilter}&day=${dayFilter}`).then((res)=>{
        dispatch(setTasks(res.data.tasks));
    })
    },[typeFilter,dayFilter])
    const { tasks } = useSelector(( state,action)=> state.task)

    const handleFilterType=(e)=>{
       setTypeFilter(e.target.value)
    }
    return ( 
           <>
    <Navbar/>
    <main>
        <div className="filter__wrapper">
        <div className="filterTypes">
            <form action="">
                <label htmlFor="filterSelect">Select Type:</label>
                <select name='filterSelect' id="filterSelect" value={typeFilter} onChange={handleFilterType}>
               { types.map((type,idx)=>(
                <option key={`${idx}-${type}`} value={type}>{type}</option>
               ))}
                </select>
            </form>
            <div className="clearFilter">
                <button onClick={()=>{setDayFilter('');setTypeFilter('')}}>Clear Filter</button>
            </div>
        </div>
        <div className="filterDays">
            {
                days.map((day,idx)=>{
                 return (<button key={`${idx}-${day.value}`} style={{backgroundColor: day.value === dayFilter ? 'active' : " "}} onClick={()=>setDayFilter(day.value)}>{day.label}</button>)
                })
            }
        </div>
        </div>
    {
    tasks && (
    <div className="task__container">
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