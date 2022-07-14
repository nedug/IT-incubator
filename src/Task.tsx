import React, { useCallback } from 'react';
import CheckboxCommon from './Components/CheckboxCommon';
import { EditableSpan } from './Components/EditableSpan';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { removeTaskTC, updateTaskTC } from './State/tasks-reducer';
import { TasksStatus, TaskType } from './API/API';
import { useAppDispatch } from './State/store';

type TaskPropsType = TaskType


const Task = React.memo(({ todoListId, status, title, id }: TaskPropsType) => {

    const dispatch = useAppDispatch();

    const onClickHandler = useCallback(() => {
        dispatch(removeTaskTC({ todoListId, id }))
    }, [dispatch, todoListId, id]);

    const onChangeHandler = useCallback((checked: boolean) => {
        dispatch(updateTaskTC({
            todolistId: todoListId,
            id,
            taskSpecial: {
                status: checked ? TasksStatus.Completed : TasksStatus.New
            },
        }))
    }, [dispatch, todoListId, id]);

    const changeTitleTask = useCallback((newInputValue: string) => {
        dispatch(updateTaskTC({
            todolistId: todoListId,
            id,
            taskSpecial: {
                title: newInputValue
            },
        }))
    }, [dispatch, todoListId, id]);

    const checkboxCallback = useCallback((checked: boolean) => {
        onChangeHandler(checked);
    }, [onChangeHandler]);


    return (
        <div style={status === TasksStatus.Completed ? { opacity: '0.4' } : { opacity: 'inherit' }}>
            <IconButton
                size={'small'}
                style={{ color: '#70b070' }}
                onClick={onClickHandler}
            >
                <Delete fontSize={'small'} />
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


