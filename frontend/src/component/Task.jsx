import React, {useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { ApiDeleteTask } from '../script/api';
import { useState } from 'react';
import { ApiUpdateTask } from '../script/api';
import { CounterDeadLineTime } from '../script/utils';
import { ClipLoader } from 'react-spinners' 
import toast from 'react-hot-toast';
const Task = ({Task,handleDeleteTask,handleUpdateCompleteTask}) => {
  const [time,setTime] = useState("");
  const [updateLoading,setUpdateLoading] = useState(false);
  const [deleteLoading,setDeleteLoading] = useState(false);
  const [completeTask,setCompleteTask] = useState(Task.isCompleted);
  const DeleteTask = async () => {
    setDeleteLoading(true);
    if(await ApiDeleteTask(Task._id))
      handleDeleteTask(Task._id);
  }
  const handleUpdateComplete = async() => {
    if(updateLoading) return
    setUpdateLoading(true);
    const updateData = { isCompleted: !Task.isCompleted }
    if(await ApiUpdateTask({updateData: updateData ,id: Task._id})){
      setCompleteTask(prevState => !prevState)
      handleUpdateCompleteTask(Task._id);
    }else{
      toast.error("Failed to update task complete data");
    }
    setUpdateLoading(false);
  }
  useEffect(() => {
    setTime(CounterDeadLineTime(Task.dueDate))
    const interval = setInterval(() => {
      setTime(CounterDeadLineTime(Task.dueDate))
    },1000)
    return () => clearInterval(interval)
  },[])
  return (
    <div className='bg-gray-100 p-4 mb-4 rounded-lg'>
        <div className='flex flex-col min-h-[200px]'>
          <div className='flex justify-between gap-4'>
            <div className='flex flex-col'>
                <Link to={`task/${Task._id}`}><h5 className='text-lg font-bold'>{Task?.title}</h5></Link>
                <p className='text-gray-600'>{Task?.description}</p>
            </div>
            <div className='flex flex-col justify-between'>
              <div className='ml-auto flex gap-2'>
                <label htmlFor='checkbox'>Complete</label>
                <input type='checkbox' checked={completeTask} onChange={handleUpdateComplete} id='checkbox'></input>
              </div>
            </div>
          </div>
          <div className='mt-auto flex justify-between'>
            {time ? <span>Time: { time }</span> : <span>Time: <ClipLoader size={16} /></span>}
            <div className='flex mt-auto justify-end'>
                <Link to={`task/${Task._id}`}><CiEdit className='cursor-pointer' size={24} /></Link>
                <button className='cursor-pointer' onClick={DeleteTask} disabled={deleteLoading}><MdDeleteOutline color='red' size={24} /></button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Task