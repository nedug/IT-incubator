import React, { useCallback, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import AddItemForm from './Components/AddItemForm';
import { addNewTodolistTC, fetchTodolistsTC } from './State/todolist-reducer';
import TodoList from './TodoList';
import { useAppDispatch, useAppSelector } from './State/store';
import { Navigate } from 'react-router-dom';

export const TodoListsList = () => {

    const todoListAll = useAppSelector(state => state.todoLists);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchTodolistsTC());
        }
    }, []);

    const addNewTodolistCallback = useCallback((valueInput: string) => {
        dispatch(addNewTodolistTC(valueInput))
    }, [dispatch]);

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }

    const todoListAllForRender = todoListAll.map(tl =>
        <TodoList key={tl.id} todoList={tl} />
    );


    return (
        <>
            <Grid container style={{ padding: '20px' }}>
                <AddItemForm
                    addNewItem={addNewTodolistCallback}
                    title='todolist'
                />
            </Grid>

            <Grid container spacing={2}>
                {todoListAllForRender}
            </Grid>
        </>
    )
};