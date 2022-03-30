import React from 'react';
import {TaskType} from "./TodoList";
import Checkbox from "./Components/Checkbox";

type TaskPropsType = TaskType & {
    removeTask: (id: string) => void
    changeStatusTask: (taskID: string, isDone: boolean) => void
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