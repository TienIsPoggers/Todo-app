import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js'
import path from 'path'
import { ConnectDB } from './config/db.js';
import { fileURLToPath } from 'url';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;
ConnectDB();
if(process.env.NODE_ENV !== 'production'){
    app.use(cors({
        origin:"http://localhost:5173"
    }));
}

app.use(express.json());
app.use('/api/tasks',taskRoutes)
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,"../../frontend/dist")))
    app.get(/.*/,(req,res) => {
        res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"))
    })
}
app.listen(PORT,() => console.log("Server started with PORT:",PORT))