const Task = ({task}) => {
    return ( 
           <>
            <div className="task__content">
                <h3>{task.name}</h3>
                <h4>Date :{task.date.split('T')[0]}</h4>
                <p>{task.type}</p>
            </div>
           </>
     );
}
 
export default Task;