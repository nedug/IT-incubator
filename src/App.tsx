import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addNewTodolistAC, changeFilterTodolistAC, changeTitleTodolistAC, removeTodolistAC, SortedTask} from "./State/todoListReducer";
import {addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC} from "./State/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./State/state";


export type TodoListAllStateType = {
    id: string
    title: string
    filter: SortedTask
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const App = () => {

    const todoListAll = useSelector<AppRootStateType, Array<TodoListAllStateType>>(state => state.todoLists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

    const dispatch = useDispatch();


    const removeTask = (TaskID: string, TodoListID: string) => {

        dispatch(removeTaskAC(TodoListID, TaskID));
    };

    const addNewTask = (valueInput: string, TodoListID: string) => {

        dispatch(addTaskAC(TodoListID, valueInput));

        filterTask(SortedTask.active, TodoListID);
    };

    const changeStatusTask = (taskID: string, isDone: boolean, TodoListID: string) => {

        dispatch(changeStatusTaskAC(TodoListID, taskID, isDone));
    };

    const changeTitleTask = (TodoListID: string, TaskID: string, newInputValue: string) => {

        dispatch(changeTitleTaskAC(TodoListID, TaskID, newInputValue));
    };


    const removeTodolist = (TodoListID: string) => {

        const action = removeTodolistAC(TodoListID);

        dispatch(action);
    };

    const addNewTodolistCallback = (valueInput: string) => {

        const action = addNewTodolistAC(valueInput);

        dispatch(action);
    };

    const filterTask = (filter: SortedTask, TodoListID: string) => {

        dispatch(changeFilterTodolistAC(TodoListID, filter));
    };

    const changeTitleTodoList = (TodoListID: string, newInputValue: string) => {

        dispatch(changeTitleTodolistAC(TodoListID, newInputValue));
    };


    const todoListAllForRender = todoListAll.map(tl => {

        const getFilteredTaskForRender = () => {

            switch (tl.filter) {
                case SortedTask.active:
                    return tasks[tl.id].filter(task => !task.isDone);
                case SortedTask.completed:
                    return tasks[tl.id].filter(task => task.isDone);
                default:
                    return tasks[tl.id];
            }
        };

        return (
            <TodoList
                key={tl.id}
                todoListID={tl.id}
                title={tl.title}
                tasks={getFilteredTaskForRender()}
                filteredTask={tl.filter}
                removeTask={removeTask}
                filterTask={filterTask}
                addNewTask={addNewTask}
                changeStatusTask={changeStatusTask}
                removeTodolist={removeTodolist}
                changeTitleTaskFromApp={changeTitleTask}
                changeTitleTodoListFromApp={changeTitleTodoList}
            />)
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