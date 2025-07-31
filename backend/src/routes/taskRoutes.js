
import express from 'express'
import { CreateTask, GetAllTask, GetTaskById, RemoveTaskByID, UpdateTaskByID } from "../controller/taskController.js";

const router = express.Router();

// Task -- 
router.get("/",GetAllTask)
router.get("/:id",GetTaskById)
router.post("/",CreateTask)
router.put("/:id",UpdateTaskByID)
router.delete("/:id",RemoveTaskByID)

export default router
