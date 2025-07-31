import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js'
import { ConnectDB } from './config/db.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

ConnectDB();
app.use(cors({
    origin:"http://localhost:5173"
}))
app.use(express.json());
app.use('/api/tasks',taskRoutes)
app.listen(PORT,() => console.log("Server started with PORT:",PORT))