import React, {useReducer} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addNewTodolistAC, changeFilterTodolistAC, changeTitleTodolistAC, removeTodolistAC, todoListReducer} from "./Reducers/todoListReducer";
import {addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC, tasksReducer} from "./Reducers/tasksReducer";

export enum SortedTask {
    all = 'All',
    active = 'Active',
    completed = 'Completed',
}

export type TodoListAllStateType = {
    id: string
    title: string
    filter: SortedTask
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const App = () => {

    const todoListID1 = v1();
    const todoListID2 = v1();

    const [todoListAll, todoListDispatch] = useReducer(todoListReducer, [
        {id: todoListID1, title: 'What to learn', filter: SortedTask.all},
        {id: todoListID2, title: 'What to buy', filter: SortedTask.completed},
    ]);

    const [tasks, tasksDispatch] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Book', isDone: false},
        ],
    });


    const removeTask = (TaskID: string, TodoListID: string) => {

        tasksDispatch(removeTaskAC(TodoListID, TaskID));
    };

    const addNewTask = (valueInput: string, TodoListID: string) => {

        tasksDispatch(addTaskAC(TodoListID, valueInput));

        filterTask(SortedTask.active, TodoListID);
    };

    const changeStatusTask = (taskID: string, isDone: boolean, TodoListID: string) => {

        tasksDispatch(changeStatusTaskAC(TodoListID, taskID, isDone));
    };

    const changeTitleTask = (TodoListID: string, TaskID: string, newInputValue: string) => {

        tasksDispatch(changeTitleTaskAC(TodoListID, TaskID, newInputValue));
    };


    const removeTodolist = (TodoListID: string) => {

        const action = removeTodolistAC(TodoListID);

        todoListDispatch(action);
        tasksDispatch(action);
    };

    const addNewTodolistCallback = (valueInput: string) => {

        const action = addNewTodolistAC(valueInput);

        todoListDispatch(action);
        tasksDispatch(action);
    };

    const filterTask = (filter: SortedTask, TodoListID: string) => {

        todoListDispatch(changeFilterTodolistAC(TodoListID, filter));
    };

    const changeTitleTodoList = (TodoListID: string, newInputValue: string) => {

        todoListDispatch(changeTitleTodolistAC(TodoListID, newInputValue));
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