import React, {useCallback} from 'react';
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


const Task = React.memo(({isDone, title, id, removeTask, changeStatusTask, changeTitleTaskFromTaskList}: TaskPropsType) => {

    console.log('Task')

    const onClickHandler = useCallback(() => {
        removeTask(id);
    }, [removeTask, id]);

    const onChangeHandler = useCallback((checked: boolean) => {
        changeStatusTask(id, checked);
    }, [changeStatusTask, id]);

    const changeTitleTask = useCallback((newInputValue: string) => {
        changeTitleTaskFromTaskList(id, newInputValue);
    }, [changeTitleTaskFromTaskList, id]);

    const checkboxCallback = useCallback((checked: boolean) => {
        onChangeHandler(checked);
    }, [onChangeHandler]);


    return (
        <div style={isDone ? {opacity: '0.5'} : {opacity: 'inherit'}}>
            <IconButton
                size={"small"}
                style={{color: '#70b070'}}
                onClick={onClickHandler}
            >
                <Delete fontSize={"small"}/>
            </IconButton>

            <CheckboxCommon
                isDone={isDone}
                callback={checkboxCallback}
            />

            <EditableSpan
                title={title}
                changeTitleTaskCallback={changeTitleTask}
            />
        </div>
    );
});

Task.displayName = 'Task';

export default Task;


