import React from "react";
import TodoListHeader from "./TodoListHeader";
import TaskList from "./TaskList";
import ControlButtons from "./ControlButtons";
import AddItemForm from "./AddItemForm";
import {Grid, Paper} from "@material-ui/core";
import {changeFilterTodolistAC, changeTitleTodolistAC, removeTodolistAC, SortedTask} from "./State/todoListReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./State/state";
import {TodoListAllStateType} from "./App";
import {addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC} from "./State/tasksReducer";

type TodolistPropsType = {
    todoList: TodoListAllStateType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


const TodoList = ({todoList}: TodolistPropsType) => {

    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todoList.id]);

    const dispatch = useDispatch();

    const removeTodolistCallback = () => dispatch(removeTodolistAC(todoList.id));

    const addNewTaskCallback = (valueInputTrim: string) => {
        dispatch(addTaskAC(todoList.id, valueInputTrim));

        if (todoList.filter === SortedTask.completed) {
            filterTaskCallback(SortedTask.active);
        }
    };

    const filterTaskCallback = (filter: SortedTask) => dispatch(changeFilterTodolistAC(todoList.id, filter));

    const removeTaskCallback = (taskID: string) => dispatch(removeTaskAC(todoList.id, taskID));

    const changeStatusTaskCallback = (taskID: string, isDone: boolean) => dispatch(changeStatusTaskAC(todoList.id, taskID, isDone));

    const changeTitleTask = (TaskID: string, newInputValue: string) => dispatch(changeTitleTaskAC(todoList.id, TaskID, newInputValue));

    const changeTitleTodoList = (newInputValue: string) => dispatch(changeTitleTodolistAC(todoList.id, newInputValue));

    const getFilteredTaskForRender = () => {

        switch (todoList.filter) {
            case SortedTask.active:
                return tasks.filter(task => !task.isDone);
            case SortedTask.completed:
                return tasks.filter(task => task.isDone);
            default:
                return tasks;
        }
    }


    return (
        <Grid item>
            <Paper
                elevation={4}
                style={{padding: '20px'}}
            >
                <TodoListHeader
                    title={todoList.title}
                    removeTodolist={removeTodolistCallback}
                    changeTitleTodoListFromTodoList={changeTitleTodoList}
                />

                <AddItemForm
                    addNewItem={addNewTaskCallback}
                />

                <TaskList
                    tasks={getFilteredTaskForRender()}
                    removeTask={removeTaskCallback}
                    changeStatusTask={changeStatusTaskCallback}
                    changeTitleTaskFromTodoList={changeTitleTask}
                />

                <ControlButtons
                    filteredTask={todoList.filter}
                    filterTask={filterTaskCallback}
                />
            </Paper>
        </Grid>
    )
};

export default TodoList;
