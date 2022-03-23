import React from 'react';
import {RemoveTaskType, TaskType} from "./TodoList";

type TaskPropsType = TaskType & {
    removeTask: RemoveTaskType
}

const Task = ({isDone, title, id, removeTask}: TaskPropsType) => {

    const onClickHandler = () => {
        removeTask(id)
    };

    return (
        <li>
            <button onClick={onClickHandler}>X</button>
            <input
                type="checkbox"
                checked={isDone}/>
            <span>{title}</span>
        </li>
    );
};

export default Task;