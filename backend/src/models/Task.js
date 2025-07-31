import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            require:true
        },
        description:{
            type:String,
            require:true
        },
        isCompleted:{
            type:Boolean,
            require:true
        },
        dueDate:{
            type:Date,
            require:false
        },
        tags:{
            type:Array,
            require:false
        }
    },
    {timestamps:true}
)
const Task = mongoose.model("task",taskSchema)
export default Task