import Task from "../models/Task.js";
export const GetAllTask = async (_,res) => {
    try{
        const tasks = await Task.find().sort({createAt: -1});
        res.status(200).json(tasks);
    }catch(error){
        console.error("Error in get all task",error)
        res.status(500).json({message:"Internal server error"});
    }
}
export const GetTaskById = async (req,res) => {
    try{
        const id = req.params.id;
        const task = await Task.findById(id);
        res.status(200).json(task);
    }catch(error){
        console.error("Failed to get Note by Id",error)
        res.status(500).json({message:"Interval server error"})
    }
}
export const CreateTask = async (req,res) => {
    try{
        const { title,description,isCompleted,dueDate,tags} = req.body;     
        const newTask = new Task({title,description,isCompleted,dueDate,tags});
        
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    }catch(error){
        console.error("Failed to create new Task",error)
        res.status(500).json({message:"Internal server error"});
    }
}
export const UpdateTaskByID = async (req,res) => {
    try{
        const { title,description,isCompleted,dueDate,tags} = req.body;    
        const id = req.params.id;
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            {title,description,isCompleted,dueDate,tags},
            {new:true}
        )
        if(!updatedTask) return res.status(404).json({message:"Task Not Found"});
        res.status(200).json(updatedTask)
    }catch(error){
        console.error("Failed to upload task",error);
        res.status(500).json({message:"Internal server error"});
    }
}
export const RemoveTaskByID = async (req,res) => {
    try{
        const id = req.params.id;
        const deletedTask = await Task.findByIdAndDelete(id);
        if(!deletedTask) return res.status(404).json({message:"Failed to delete Task"})
        res.status(200).json({message:"Success to remove note"})
    }catch(error){
        console.error("Failed to delete Task",error)
        res.status(500).json({message:"Internal server error"});
    }
}