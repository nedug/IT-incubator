import React from 'react';
import {TaskType} from "./TodoList";
import Checkbox from "./Components/Checkbox";
import {EditableSpan} from "./EditableSpan";

type TaskPropsType = TaskType & {
    removeTask: (taskID: string) => void
    changeStatusTask: (taskID: string, isDone: boolean) => void
    changeTitleTaskFromTaskList: (taskID: string, newInputValue: string) => void
}


const Task = ({isDone, title, id, removeTask, changeStatusTask, changeTitleTaskFromTaskList}: TaskPropsType) => {

    const onClickHandler = () => {
        removeTask(id);
    };

    const onChangeHandler = (checked: boolean) => {
        changeStatusTask(id, checked);
    };

    const changeTitleTask = (newInputValue: string) => {
        changeTitleTaskFromTaskList(id, newInputValue);
    };


    return (
        <li className={isDone ? 'is-done' : ''}>
            <button onClick={onClickHandler}>X</button>

            <Checkbox
                isDone={isDone}
                callback={checked => onChangeHandler(checked)}
            />

            <EditableSpan
                title={title}
                changeTitleTaskCallback={changeTitleTask}
            />
        </li>
    );
};

export default Task;


