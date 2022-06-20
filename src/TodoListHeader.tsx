import React, { useCallback } from 'react';
import { EditableSpan } from './Components/EditableSpan';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import { RequestStatus } from './State/app-reducer';

type TodoListHeaderPropsType = {
    title: string
    removeTodolist: () => void
    changeTitleTodoListFromTodoList: (newInputValue: string) => void
    entityStatus: RequestStatus
}


const TodoListHeader = React.memo(({ title, removeTodolist, changeTitleTodoListFromTodoList, ...props }: TodoListHeaderPropsType) => {

    const onClickHandler = useCallback(() => {
        removeTodolist();
    }, [removeTodolist]);

    const changeTitleTodoList = useCallback((newInputValue: string) => {
        changeTitleTodoListFromTodoList(newInputValue);
    }, [changeTitleTodoListFromTodoList]);


    return (
        <h3 style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '0 0 5px', padding: '0' }}>
            <EditableSpan
                title={title}
                changeTitleTaskCallback={changeTitleTodoList}
            />

            <IconButton
                disabled={props.entityStatus === RequestStatus.loading}
                style={{ color: '#1e1e1e' }}
                onClick={onClickHandler}>
                <Delete />
            </IconButton>
        </h3>
    )
});

TodoListHeader.displayName = 'TodoListHeader';

export default TodoListHeader;