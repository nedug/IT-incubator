import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export enum SortedTask {
    all = 'all',
    active = 'active',
    completed = 'completed',
}

type TodoListAllStateType = {
    id: string
    title: string
    filter: SortedTask
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}


const App = () => {

    const todoListID1 = v1();
    const todoListID2 = v1();

    const [todoListAll, setTodoListAll] = useState<Array<TodoListAllStateType>>([
        {id: todoListID1, title: 'What to learn', filter: SortedTask.all},
        {id: todoListID2, title: 'What to buy', filter: SortedTask.completed},
    ]);

    const [tasks, setTasks] = useState<TasksStateType>({
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

        setTasks({
            ...tasks,
            [TodoListID]: tasks[TodoListID].filter(task => task.id !== TaskID)
        });
    };

    const addNewTask = (valueInput: string, TodoListID: string) => {

        const newTask = {id: v1(), title: valueInput, isDone: false};
        setTasks({...tasks, [TodoListID]: [newTask, ...tasks[TodoListID]]});

        filterTask(SortedTask.active, TodoListID);
    };

    const filterTask = (filter: SortedTask, TodoListID: string) => {

        setTodoListAll(todoListAll.map(tl => tl.id === TodoListID ? {...tl, filter} : tl));
    };

    const changeStatusTask = (taskID: string, isDone: boolean, TodoListID: string) => {

        setTasks({
            ...tasks,
            [TodoListID]: tasks[TodoListID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        });
    };

    const removeTodolist = (TodoListID: string) => {

        setTodoListAll(todoListAll.filter(tl => tl.id !== TodoListID));

        delete tasks[TodoListID];
        setTasks({...tasks});
    };

    const addNewTodolistCallback = (valueInput: string) => {

        const newTodolist: TodoListAllStateType = {
            id: v1(), title: valueInput, filter: SortedTask.all
        };

        setTodoListAll([
            newTodolist,
            ...todoListAll
        ]);

        setTasks({
            ...tasks,
            [newTodolist.id]: []
        });
    };

    const changeTitleTask = (TodoListID: string, TaskID: string, newInputValue: string) => {

        setTasks({
            ...tasks,
            [TodoListID]: tasks[TodoListID].map(t => t.id === TaskID ? {...t, title: newInputValue} : t)
        });
    };

    const changeTitleTodoList = (TodoListID: string, newInputValue: string) => {

        setTodoListAll(todoListAll.map(tl => tl.id === TodoListID ? {...tl, title: newInputValue} : tl));
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

        return <TodoList
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
        />

    })

    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>

                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addNewItem={addNewTodolistCallback}/>
                </Grid>

                <Grid container spacing={1}>
                    {todoListAllForRender}
                </Grid>

            </Container>
        </div>
    )
};

export default App;