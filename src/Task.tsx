import React, {ChangeEvent} from 'react';
import {changeStatusTaskType, RemoveTaskType, TaskType} from "./TodoList";

type TaskPropsType = TaskType & {
    removeTask: RemoveTaskType
    changeStatusTask: changeStatusTaskType
}

const Task = ({isDone, title, id, removeTask, changeStatusTask}: TaskPropsType) => {

    const onClickHandler = () => {
        removeTask(id);
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // changeStatusTask(id, !isDone); /* Передача обратного значения isDone */

        const newStatusTask = e.target.checked;
        changeStatusTask(id, newStatusTask);
    };

    return (
        <li className={isDone ? 'is-done' : ''}>
            <button onClick={onClickHandler}>X</button>

            <input
                type="checkbox"
                checked={isDone}
                onChange={onChangeHandler}
            />

            <span>{title}</span>
        </li>
    );
};

export default Task;