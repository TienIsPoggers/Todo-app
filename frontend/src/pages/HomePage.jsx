import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Task from '../component/Task.jsx'
import { ApiGetAllTask } from '../script/api.js'
const HomePage = () => {
  const [loading,setLoading] = useState(false);
  const [tasks,setTasks] = useState([]);
  useEffect(() => {
    const loadAllTask = async () => {
      setLoading(true);
      let data = await ApiGetAllTask()
      if(data){
        setTasks(data);
      }else{
        toast.error("Failed to load all task");
      }
      setLoading(true);
    }
    loadAllTask();
  },[])
  const handleDeleteTask = (id) => {
    setTasks(prevState => prevState.filter(v => v._id !== id))
  }
  const handleUpdateCompleteTask = (id) => {
    setTasks(prevState => 
      prevState.map(task => 
        task._id === id ? {...task,isCompleted: !task.isCompleted} : task
      )
    ) 
    
  }
  const inCompleteTasks = tasks.filter(t => !t.isCompleted)
  const CompleteTasks = tasks.filter(t => t.isCompleted)
  return (
    <>
      <div className='container mx-auto'>
        <h3 className='text-3xl font-bold text-center mt-5'>Home Page</h3>
        <div className='flex gap-8 mt-8'>
          <TaskSection title="Task" tasks={inCompleteTasks} handleUpdateCompleteTask={handleUpdateCompleteTask} handleDeleteTask={handleDeleteTask} />
          <TaskSection title="Complete Task" tasks={CompleteTasks} handleUpdateCompleteTask={handleUpdateCompleteTask} handleDeleteTask={handleDeleteTask} />
        </div>
      </div>
    </>
  )


}
const TaskSection = ({title,tasks,handleUpdateCompleteTask,handleDeleteTask}) => (
  <div className='flex-1'>
    <h4 className='text-center font-bold text-3xl mb-8'>{title}</h4>
    <div>
      {tasks.map((item,_) => (
        <Task key={item._id} handleUpdateCompleteTask={handleUpdateCompleteTask} handleDeleteTask={handleDeleteTask} Task={item} />
      ))}
    </div>
  </div>
)
export default HomePage