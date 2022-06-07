import React, {useCallback, useEffect} from 'react';
import './App.css';
import TodoList from './TodoList';
import AddItemForm from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {addNewTodolistAC, addNewTodolistTC, fetchTodolistsTC, selectTodoLists} from './State/todolist-Reducer';
import {useDispatch, useSelector} from 'react-redux';


const App = () => {

    const todoListAll = useSelector(selectTodoLists);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodolistsTC() as any);
    }, []);


    const addNewTodolistCallback = useCallback((valueInput: string) => {
        dispatch(addNewTodolistTC(valueInput) as any)
    }, [dispatch]);

    const todoListAllForRender = todoListAll.map(tl => {
        return (
            <TodoList
                key={tl.id}
                todoList={tl}
            />
        )
    })


    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoList
                    </Typography>
                    <Button
                        variant={"outlined"}
                        color={"secondary"}
                    >
                        Login
                    </Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addNewItem={addNewTodolistCallback}/>
                </Grid>

                <Grid container spacing={2}>
                    {todoListAllForRender}
                </Grid>
            </Container>

        </div>
    )
};

export default App;