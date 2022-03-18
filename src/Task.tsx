import React from 'react';
import {TaskType} from "./TodoList";

type TaskPropsType = TaskType

const Task = ({isDone, title}: TaskPropsType) => {
    return (
        <li>
            <input
                type="checkbox"
                checked={isDone}/>
            <span>{title}</span>
        </li>
    );
};

export default Task;