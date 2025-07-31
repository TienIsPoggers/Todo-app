import toast from 'react-hot-toast'
const Api_URL = 'http://localhost:5001/api';

export const ApiGetAllTask = async () => {
    try{
        const res = await fetch(`${Api_URL}/tasks`);
        if(!res.ok){
            throw new Error("Failed to load all Tasks");
        }
        const data = await res.json();
        return data;
    }catch(error){
        return null;
    }
}
export const ApiGetTaskByID = async (id) => {
    try{
        const res = await fetch(`${Api_URL}/tasks/${id}`);
        if(!res.ok){
            throw new Error("Failed to load data by ID");
        }
        const data = await res.json();
        return data;
    }catch(error){
        console.log(error)
        return null;
    }
}
export const ApiCreateTask = async (formData) => {
    const JsonData = Object.fromEntries(formData.entries())
    try{
        await fetch(`${Api_URL}/tasks`,{
            method:"POST",
            headers:{
                'Content-Type':"application/json",
            },
            body:JSON.stringify(JsonData)
        })
    }catch(error){
        return false;
    }
    finally{
        return true;
    }
}
export const ApiDeleteTask = async (id) => {
    if(!confirm("Are you sure you want to delete Task")) return; 
    try{
        await fetch(`${Api_URL}/tasks/${id}`,{method:"DELETE"})
        toast.success("Success to remove task")
    }catch(error){
        toast.error("Failed to delete task");
        return false;
    }finally{
        return true;
    }
}
export const ApiUpdateTask = async ({updateData,id}) => {
    try{
        await fetch(`${Api_URL}/tasks/${id}`,{
            method:"PUT",
            headers:{
                'Content-Type':"application/json",
            },
            body:JSON.stringify(updateData)
        })
    }catch(error){
        return false;
    }
    finally{
        return true;
    }
}