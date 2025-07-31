import React, { useState } from 'react'
import { IoIosExit } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom'
import { ApiCreateTask } from '../script/api';
import { GetMinTime } from '../script/utils';
import toast from 'react-hot-toast';
const CreatePage = () => {
  const [loading,setLoading] = useState(false);
  const [title,setTitle] = useState('Test');
  const [description,setDescription] = useState('Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis aliquid non veniam officiis totam sunt praesentium ducimus aliquam. Voluptas, provident!');
  const [date,setDate] = useState(GetMinTime().toISOString().split("T")[0]) 
  const navigate = useNavigate();
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if(loading) return;
    if(!title.trim() || !description.trim()){
      toast.error("Please fill all input")
      return
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('title',title);
    formData.append('description',description);
    formData.append('dueDate',date);
    if(await ApiCreateTask(formData)){
      toast.success("Succuess to create new task");
      navigate('/');
    }
    else
      toast.error("Failed to create task");
    
  }
  return (
    <div className='container mx-auto px-4'>
      <div className='ml-auto mt-4 bg-gray-200 w-fit p-2 pr-4'>
        <Link to={"/"}><span className='flex gap-2 text-xl items-center text-gray-500'><IoIosExit size={28} color='gray'/> Back to menu</span></Link>
      </div>
      <div className='flex flex-col gap-4 mt-8'>
        <div className='flex flex-col gap-2 items-center justify-center'>
          <h3 className='text-3xl fonb-bold text-center'>Created Page</h3>
          <p className='text-gray-400 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam omnis quae ab nemo tempore a quaerat porro vero facilis earum!</p>
        </div>
        <form onSubmit={handleCreateTask} className='w-[600px] h-[600px] mx-auto mt-8 p-4 bg-gray-200'>
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
              <button type='sumbit' className='cursor-pointer bg-green-400 px-4 py-2 rounded-lg font-bold text-white text-xl' disabled={loading}>{loading ? "Creating..." : "Create"}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePage