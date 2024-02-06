import React, {ChangeEvent, useState} from "react";
import {ToDo} from "../Interfaces.ts";
import ToDoTask from "./ToDoTask.tsx";

const ToDoList:React.FC = () =>{
    const [task, setTask] = useState<string>('');
    const [id, setId] = useState<number>(0);
    const [toDoList, setToDoList] = useState<ToDo[]>([]);

    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        setTask(event.target.value)
    }

    function addToDo(){
        const newToDo = {
            id: id,
            task: task
        }
        setToDoList([... toDoList, newToDo]);
        setTask('');
        setId(id + 1);
    }

    function deleteById(id:number) {
        setToDoList(toDoList.filter(toDo => toDo.id !== id))
    }

    const editById = (id: number, updatedTask: string) => {
        setToDoList(
            toDoList.map((toDo) =>
                toDo.id === id ? { ...toDo, task: updatedTask } : toDo
            )
        );
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