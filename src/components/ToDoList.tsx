import React, {ChangeEvent, useEffect, useState} from "react";
import {ToDo} from "../Interfaces.ts";
import ToDoTask from "./ToDoTask.tsx";
import {ToDoAdaptor} from "../services/ToDoAdaptor.ts";

const ToDoList:React.FC = () =>{
    const [task, setTask] = useState<string>('');
    const [id, setId] = useState<number>(3000);
    const [toDoList, setToDoList] = useState<ToDo[]>([]);
    const toDoAdaptor = new ToDoAdaptor("http://localhost:3000/todos");

    useEffect(() => {
        const fetchToDos = async () => {
            const todos = await toDoAdaptor.asyncFindAll();
            console.log(todos)
            if (todos) {
                setToDoList(todos);
            }
        };

        fetchToDos().catch(console.error);
    }, []); // empty dependency array ensures the effect only runs once on component mount

    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        setTask(event.target.value)
    }

    function addToDo(){
        const newToDo = {
            id: id,
            task: task
        }
        toDoAdaptor.asyncSave(newToDo);
        setToDoList([... toDoList, newToDo]);
        setTask('');
        setId(id + 1);
    }

    function deleteById(id:number) {
        toDoAdaptor.asyncDeleteById(id)
        setToDoList(toDoList.filter(toDo => toDo.id !== id))
    }

    const editById = (id: number, updatedTask: string) => {
        setToDoList(
            toDoList.map((toDo) =>
                toDo.id === id ? { ...toDo, task: updatedTask } : toDo
            )
        );
        const editedToDo = {
            id: id,
            task: updatedTask
        }
        toDoAdaptor.asyncEditById(id, editedToDo)
    };

    return(
        <div>
            <h1>To Do:</h1>

            <input type='text' name='task' placeholder='add task' value={task} onChange={handleChange}></input>
            <button onClick={addToDo}>Add</button>

            <div className='list'>
                {toDoList.map(ToDo =>
                    <ToDoTask
                        key={ToDo.id}
                        toDo={ToDo}
                        deleteById={deleteById}
                        editById={editById}
                    ></ToDoTask>)}
            </div>
        </div>
    )
}

export default ToDoList