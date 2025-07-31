import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { ApiGetTaskByID, ApiUpdateTask,ApiDeleteTask } from '../script/api';
import { Link } from "react-router-dom"
import toast from 'react-hot-toast';
import { IoIosExit } from "react-icons/io";
import { GetMinTime } from '../script/utils';
const TaskPage = () => {
  const [loadingDelete,setLoadingDelete] = useState(false);
  const [loading,setLoading] = useState(false);
  const [title,setTitle] = useState('Test');
  const [description,setDescription] = useState('Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis aliquid non veniam officiis totam sunt praesentium ducimus aliquam. Voluptas, provident!');
  const [date,setDate] = useState(GetMinTime().toISOString().split("T")[0]) 
  const [task,setTask] = useState(null);
  const {id} = useParams();
  const navigate = useNavigate();
  const handleLoadTaskById = async (id) => {
    setLoading(true);
    const loadTask = await ApiGetTaskByID(id);
    if(loadTask){
      setTask(loadTask);
      setTitle(loadTask.title)
      setDescription(loadTask.description)
      setDate(new Date(loadTask.dueDate ? loadTask.dueDate : GetMinTime()).toISOString().split("T")[0])
    }else{
      toast.error("Failed to load task");
    }
    setLoading(false);
  }
  useEffect(() => {
    handleLoadTaskById(id);
  },[id])

  const handleUpdateTaskData = async (e) => {
    e.preventDefault();
    if(!title.trim() || !description.trim()){
      toast.error("Please fill all field.");
      return
    }
    if(task.title === title && task.description === description && new Date(task.dueDate ? task.dueDate : GetMinTime()).toISOString().split("T")[0] === date ){
      toast("Please change something before save")
      return;
    }
    const updateData = { title:title, description:description, dueDate:date }
    if(await ApiUpdateTask({id: id,updateData: updateData,})){
      setTask(prev => {return {...prev,title:title,description:description,dueDate:date}});
      toast.success("Success to update task")
    }else{
      toast.error("Failed to update task")
    }
  }
  const DeleteTask = async () => {
    setLoadingDelete(true);
    if(await ApiDeleteTask(id)){
      navigate("/")
    }
    setLoadingDelete(false);
  }
  if(loading){
    return <div>
      Loading...
    </div>
  }
  return (
    <>
      {task !== null ?
        <div className='container mx-auto px-4'>
          <div className='ml-auto mt-4 bg-gray-200 w-fit p-2 pr-4'>
            <Link to={"/"}><span className='flex gap-2 text-xl items-center text-gray-500'><IoIosExit size={28} color='gray'/> Back to menu</span></Link>
          </div>
          <div className='flex flex-col gap-4 mt-8'>
            <div className='flex flex-col gap-2 items-center justify-center'>
              <h3 className='text-3xl fonb-bold text-center'>Edit Page</h3>
              <p className='text-gray-400 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam omnis quae ab nemo tempore a quaerat porro vero facilis earum!</p>
            </div>
            <form onSubmit={handleUpdateTaskData} className='w-[600px] h-[600px] mx-auto mt-8 p-4 bg-gray-200'>
              <div className='flex flex-col h-full py-2 justify-between gap-4'>
                <div className='flex flex-col gap-4 flex-1'>
                  <div className='flex flex-col gap-1'>
                    <label htmlFor='title' className='font-bold text-lg'>Title</label>
                    <input className='border-2 bg-white p-2' placeholder='Please enter title' onChange={e => setTitle(e.target.value)} value={title} type='text' id='title'></input>
                  </div>
                  <div className='flex flex-col gap-1 flex-1'>
                    <label htmlFor='description' className='font-bold text-lg'>Description</label>
                    <textarea className='border-2 bg-white h-full p-2' type='text' placeholder='Please enter description' onChange={e => setDescription(e.target.value)} value={description} id='description'></textarea>
                  </div>
                </div>
                <div className='flex items-end justify-center gap-4'>
                  <div className='flex flex-col gap-1 flex-1'>
                    <label htmlFor='date' className='font-bold text-lg'>Date (Deadline)</label>
                    <input className='border-2 bg-white p-2' onChange={e =>  setDate(e.target.value)} value={date} min={GetMinTime().toISOString().split("T")[0]} type='date' id='date'></input>
                  </div>
                  <button type='sumbit' className='cursor-pointer bg-green-400 px-4 py-2 rounded-lg font-bold text-white text-xl' disabled={loading}>{loading ? "Saving..." : "Save"}</button>
                </div>
              </div>
            </form>
          </div>
          <button onClick={DeleteTask} className='border-2 px-4 py-2 cursor-pointer' disabled={loadingDelete}>{loadingDelete ? "Deleting..." : "Delete"}</button>
        </div>
      : 
        <div className='container mx-auto mt-8 px-4'>
          <div className='flex flex-col gap-2'>
            <h3 className='text-center text-4xl font-bold'>Task Not Found</h3>
            <p className='text-gray-400 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium odio, eaque vel nihil quasi deserunt ipsa dicta asperiores. Ea, vel.</p>
          </div>
        </div>
        
      }
    </>
    
  )
}

export default TaskPage