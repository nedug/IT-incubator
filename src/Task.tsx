import React, {useCallback} from 'react';
import CheckboxCommon from './Components/CheckboxCommon';
import {EditableSpan} from './Components/EditableSpan';
import {Delete} from '@material-ui/icons';
import {IconButton} from '@material-ui/core';
import {removeTaskTC, updateTaskTC} from './State/tasks-Reducer';
import {useDispatch} from 'react-redux';
import {TasksStatus, TaskType} from './API/API';

type TaskPropsType = TaskType


const Task = React.memo(({todoListId, status, title, id}: TaskPropsType) => {

    const dispatch = useDispatch();

    const onClickHandler = useCallback(() => {
        dispatch(removeTaskTC(todoListId, id) as any)
    }, [dispatch, todoListId, id]);

    const onChangeHandler = useCallback((checked: boolean) => {
        dispatch(updateTaskTC(todoListId, id, {status: checked ? TasksStatus.Completed : TasksStatus.New}) as any)
    }, [dispatch, todoListId, id]);

    const changeTitleTask = useCallback((newInputValue: string) => {
        dispatch(updateTaskTC(todoListId, id, {title: newInputValue}) as any)
    }, [dispatch, todoListId, id]);

    const checkboxCallback = useCallback((checked: boolean) => {
        onChangeHandler(checked);
    }, [onChangeHandler]);


    return (
        <div style={status === TasksStatus.Completed ? {opacity: '0.5'} : {opacity: 'inherit'}}>
            <IconButton
                size={'small'}
                style={{color: '#70b070'}}
                onClick={onClickHandler}
            >
                <Delete fontSize={'small'}/>
            </IconButton>

            <CheckboxCommon
                status={status}
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


