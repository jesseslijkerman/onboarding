import {ToDo} from "../Interfaces.ts";
import React, {useState} from "react";
import {Button, Grid, TextField} from "@mui/material";

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
        <Grid
            container
            direction = 'row'
            jusify-content = 'center'
            className='toDo'
        >
            {isEditing ? (
                <div>
                    <TextField
                        variant='standard'
                        defaultValue={toDo.task}
                        value={editedTask}
                        onChange={handleInputChange}>
                    </TextField>
                    <Button variant="outlined" onClick={toggleIsEditing}>Cancel</Button>
                    <Button variant="outlined" onClick={saveEditedTask}>Save</Button>
                </div>
            ) : (
                <div>
                    <span>{toDo.task}</span>
                    <Button variant="outlined" onClick={toggleIsEditing}>Edit</Button>
                </div>
            )}

            <Button variant="outlined" onClick={() => {
                deleteById(toDo.id)
            }}>Delete</Button>
        </Grid>
    )
}

export default ToDoTask;