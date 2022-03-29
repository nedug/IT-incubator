import React from 'react';
import {changeStatusTaskType, RemoveTaskType, TaskType} from "./TodoList";
import Checkbox from "./Components/Checkbox";

type TaskPropsType = TaskType & {
    removeTask: RemoveTaskType
    changeStatusTask: changeStatusTaskType
}


const Task = ({isDone, title, id, removeTask, changeStatusTask}: TaskPropsType) => {

    const onClickHandler = () => {
        removeTask(id);
    };

    const onChangeHandler = (checked: boolean) => {
        changeStatusTask(id, checked);
    };

    return (
        <li className={isDone ? 'is-done' : ''}>
            <button onClick={onClickHandler}>X</button>

            <Checkbox
                isDone={isDone}
                callback={checked => onChangeHandler(checked)}
            />

            <span>{title}</span>
        </li>
    );
};

export default Task;