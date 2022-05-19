import React, {useCallback} from 'react';
import {TaskType} from "./TodoList";
import CheckboxCommon from "./Components/CheckboxCommon";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import {changeStatusTaskAC, changeTitleTaskAC, removeTaskAC} from "./State/tasksReducer";
import {useDispatch} from "react-redux";

type TaskPropsType = TaskType & {
    todolistId: string
}


const Task = React.memo(({todolistId, isDone, title, id,}: TaskPropsType) => {

    const dispatch = useDispatch();

    const onClickHandler = useCallback(() => {
        dispatch(removeTaskAC(todolistId, id))
    }, [dispatch, todolistId, id]);

    const onChangeHandler = useCallback((checked: boolean) => {
        dispatch(changeStatusTaskAC(todolistId, id, checked))
    }, [dispatch, todolistId, id]);

    const changeTitleTask = useCallback((newInputValue: string) => {
        dispatch(changeTitleTaskAC(todolistId, id, newInputValue))
    }, [dispatch, todolistId, id]);

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


