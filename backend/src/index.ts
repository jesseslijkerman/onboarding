import { AppDataSource } from "./data-source"
import * as express from 'express';
import {ToDo} from "./entity/ToDo";
import {Request, Response} from "express";
import * as dotenv from "dotenv";
import * as cors from "cors";

AppDataSource.initialize().then(async () => {
    console.log("Data Source has been initialized!")
    dotenv.config()
}).catch(error => console.log(error))

const app = express();
app.use(express.json());
app.use(cors())
const port = process.env.PORT || 3000;

// Create a new ToDo
app.post('/todos', async (req: Request, res: Response) => {
    try {
        const { task }: { task: string } = req.body;
        const todo = new ToDo();
        todo.task = task;
        const savedTodo = await AppDataSource.getRepository(ToDo).save(todo)
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create ToDo '+ error });
    }
});

// Get all ToDos
app.get('/todos', async (_req: Request, res: Response) => {
    try {
        const todos = await AppDataSource.getRepository(ToDo).find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch ToDos' });
    }
});

// Update a ToDo
app.put('/todos/:id', async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);
        const { task }: { task: string } = req.body;
        const todo = await AppDataSource.getRepository(ToDo).findOne({
            where: { id: id }
        });
        if (!todo) {
            return res.status(404).json({ error: 'ToDo not found' });
        }
        todo.task = task;
        const updatedTodo = await AppDataSource.getRepository(ToDo).save(todo);
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update ToDo' });
    }
});

// Delete a ToDo
app.delete('/todos/:id', async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);
        const todo = await AppDataSource.getRepository(ToDo).findOne({
            where: { id: id }
        });
        if (!todo) {
            return res.status(404).json({ error: 'ToDo not found' });
        }
        await AppDataSource.getRepository(ToDo).remove(todo);
        res.json({ message: 'ToDo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete ToDo' });
    }
});

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});


