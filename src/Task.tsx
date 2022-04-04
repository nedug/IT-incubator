import React from 'react';
import {TaskType} from "./TodoList";
import CheckboxCommon from "./Components/CheckboxCommon";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";

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
        <div style={isDone ? {opacity: '0.5'} : {opacity: 'inherit'}}>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>

            <CheckboxCommon
                isDone={isDone}
                callback={checked => onChangeHandler(checked)}
            />

            <EditableSpan
                title={title}
                changeTitleTaskCallback={changeTitleTask}
            />
        </div>
    );
};

export default Task;


