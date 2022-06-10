import React, { useCallback, useEffect } from 'react';
import './CSS/App.css';
import TodoList from './TodoList';
import AddItemForm from './Components/AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, LinearProgress, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { addNewTodolistTC, fetchTodolistsTC, selectTodoLists } from './State/todolist-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './State/store';
import { RequestStatus } from './State/app-reducer';
import { ErrorSnackbar } from './Components/ErrorSnackbar';


const App = () => {

    const requestStatus = useSelector<AppRootStateType, RequestStatus>(state => state.app.status);

    const todoListAll = useSelector(selectTodoLists);
    const dispatch = useDispatch();

    useEffect(() => dispatch(fetchTodolistsTC() as any), []);

    const addNewTodolistCallback = useCallback((valueInput: string) => {
        dispatch(addNewTodolistTC(valueInput) as any)
    }, [dispatch]);


    const todoListAllForRender = todoListAll.map(tl =>
        <TodoList key={tl.id} todoList={tl} />
    )


    return (
        <div className="App">

            <ErrorSnackbar />

            <AppBar position="static">
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        TodoList
                    </Typography>
                    <Button variant={'outlined'} color={'secondary'}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>

            <div style={{ height: '20px' }}>
                {requestStatus === RequestStatus.loading && <LinearProgress color="secondary" />}
            </div>

            <Container fixed>
                <Grid container style={{ padding: '20px' }}>
                    <AddItemForm addNewItem={addNewTodolistCallback} />
                </Grid>
                <Grid container spacing={2}>
                    {todoListAllForRender}
                </Grid>
            </Container>

        </div>
    )
};

export default App;