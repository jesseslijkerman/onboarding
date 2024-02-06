import {ToDo} from "../Interfaces.ts";
import React, {useState} from "react";

interface Props{
    toDo: ToDo;
    deleteById(id:number):void;
    editById(id: number, updatedTask: string): void;
}

const ToDoTask = ({toDo, deleteById, editById}:Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const toggleIsEditing = () => setIsEditing(isEditing => !isEditing)
    const [editedTask, setEditedTask] = useState(toDo.task); // State to hold edited task

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTask(event.target.value);
    };

    const saveEditedTask = () => {
        editById(toDo.id, editedTask); // Call parent function to save edited task
        toggleIsEditing();
    };

    return (
        <div className='toDo'>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        defaultValue={toDo.task}
                        value={editedTask}
                        onChange={handleInputChange}>
                    </input>
                    <button onClick={toggleIsEditing}>Cancel</button>
                    <button onClick={saveEditedTask}>Save</button>
                </div>
            ) : (
                <div>
                    <span>{toDo.task}</span>
                    <button onClick={toggleIsEditing}>Edit</button>
                </div>
            )}

            <span>{toDo.id}</span>
            <button onClick={() => {
                deleteById(toDo.id)
            }}>Delete</button>
        </div>
    )
}

export default ToDoTask;