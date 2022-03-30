import React from 'react';
import {changeStatusTaskType, RemoveTaskType, TaskType} from "./TodoList";
import Checkbox from "./Components/Checkbox";

type TaskPropsType = TaskType & {
    // todoListID: string
    removeTask: /*RemoveTaskType*/ (id: string) => void
    changeStatusTask: (taskID: string, isDone: boolean) => void
}


const Task = ({/*todoListID,*/ isDone, title, id, removeTask, changeStatusTask}: TaskPropsType) => {

    const onClickHandler = () => {
        removeTask(id/*, todoListID*/);
    };

    const onChangeHandler = (checked: boolean) => {
        changeStatusTask(id, checked/*, todoListID*/);
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