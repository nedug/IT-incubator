import React from 'react';
import {RemoveTaskType, TaskType} from "./TodoList";

type TaskPropsType = TaskType & {
    removeTask: RemoveTaskType
}

const Task = ({isDone, title, id, removeTask}: TaskPropsType) => {
    return (
        <li>
            <button onClick={() => removeTask(id)}>X</button>
            <input
                type="checkbox"
                checked={isDone}/>
            <span>{title}</span>
        </li>
    );
};

export default Task;