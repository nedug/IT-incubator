import React, {ChangeEvent} from 'react';
import {/*changeStatusTaskType,*/ RemoveTaskType, TaskType} from "./TodoList";

type TaskPropsType = TaskType & {
    removeTask: RemoveTaskType
    // changeStatusTask: changeStatusTaskType
    callback: (checked: boolean) => void
}


const Task = ({isDone, title, id, removeTask, callback/*, changeStatusTask*/}: TaskPropsType) => {

    const onClickHandler = () => {
        removeTask(id);
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callback(e.target.checked);
    };
    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     changeStatusTask(id, e.target.checked);
    // };

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