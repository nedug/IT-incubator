import React, { useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import AddItemForm from './Components/AddItemForm';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTodolistTC, selectTodoLists } from './State/todolist-reducer';
import TodoList from './TodoList';

export const TodoListsList = () => {

    const todoListAll = useSelector(selectTodoLists);
    const dispatch = useDispatch();

    const addNewTodolistCallback = useCallback((valueInput: string) => {
        dispatch(addNewTodolistTC(valueInput) as any)
    }, [dispatch]);


    const todoListAllForRender = todoListAll.map(tl =>
        <TodoList key={tl.id} todoList={tl} />
    );


    return (
        <>
            <Grid container style={{ padding: '20px' }}>
                <AddItemForm
                    addNewItem={addNewTodolistCallback}
                />
            </Grid>

            <Grid container spacing={2}>
                {todoListAllForRender}
            </Grid>
        </>
    )
};