import React, { useCallback, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import AddItemForm from './Components/AddItemForm';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTodolistTC, fetchTodolistsTC, selectTodoLists } from './State/todolist-reducer';
import TodoList from './TodoList';
import { AppRootStateType } from './State/store';
import { Navigate } from 'react-router-dom';

export const TodoListsList = () => {

    const todoListAll = useSelector(selectTodoLists);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchTodolistsTC() as any);
        }
    }, []);

    const addNewTodolistCallback = useCallback((valueInput: string) => {
        dispatch(addNewTodolistTC(valueInput) as any)
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
                />
            </Grid>

            <Grid container spacing={2}>
                {todoListAllForRender}
            </Grid>
        </>
    )
};