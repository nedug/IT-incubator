import React from "react";
import TodoListHeader from "./TodoListHeader";
import TaskList from "./TaskList";
import ControlButtons from "./ControlButtons";
import AddItemForm from "./AddItemForm";
import {SortedTask} from "./App";
import {Grid, Paper} from "@material-ui/core";

type TodolistPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    removeTask: RemoveTaskType
    filterTask: FilterTaskType
    addNewTask: addNewTaskType
    changeStatusTask: changeStatusTaskType
    filteredTask: SortedTask
    removeTodolist: removeTodolistType
    changeTitleTaskFromApp: changeTitleTaskFromAppType
    changeTitleTodoListFromApp: changeTitleTodoListFromAppType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type RemoveTaskType = (id: string, TodoListID: string) => void
export type FilterTaskType = (filter: SortedTask, TodoListID: string) => void
export type addNewTaskType = (valueInput: string, TodoListID: string) => void
export type changeStatusTaskType = (taskID: string, isDone: boolean, TodoListID: string) => void
export type removeTodolistType = (TodoListID: string) => void
export type changeTitleTaskFromAppType = (TodoListID: string, TaskID: string, newInputValue: string) => void
export type changeTitleTodoListFromAppType = (TodoListID: string, newInputValue: string) => void


const TodoList = ({todoListID, title, tasks, removeTask, filterTask, addNewTask, changeStatusTask, filteredTask, removeTodolist, changeTitleTaskFromApp, changeTitleTodoListFromApp}: TodolistPropsType) => {

    const removeTodolistCallback = () => {
        removeTodolist(todoListID);
    };

    const addNewTaskCallback = (valueInputTrim: string) => {
        addNewTask(valueInputTrim, todoListID);
    };

    const filterTaskCallback = (filter: SortedTask) => {
        filterTask(filter, todoListID);
    };

    const removeTaskCallback = (taskID: string) => {
        removeTask(taskID, todoListID);
    };

    const changeStatusTaskCallback = (taskID: string, isDone: boolean) => {
        changeStatusTask(taskID, isDone, todoListID);
    };

    const changeTitleTask = (TaskID: string, newInputValue: string) => {
        changeTitleTaskFromApp(todoListID, TaskID, newInputValue);
    };

    const changeTitleTodoList = (newInputValue: string) => {
        changeTitleTodoListFromApp(todoListID, newInputValue);
    };


    return (
        <Grid item>
            <Paper style={{
                padding: '20px',
                boxShadow: '1px 1px 4px 2px rgb(0 0 0 / 20%)',
            }}>

                <TodoListHeader
                    title={title}
                    removeTodolist={removeTodolistCallback}
                    changeTitleTodoListFromTodoList={changeTitleTodoList}
                />

                <AddItemForm
                    addNewItem={addNewTaskCallback}
                />

                <TaskList
                    tasks={tasks}
                    removeTask={removeTaskCallback}
                    changeStatusTask={changeStatusTaskCallback}
                    changeTitleTaskFromTodoList={changeTitleTask}
                />

                <ControlButtons
                    filteredTask={filteredTask}
                    filterTask={filterTaskCallback}
                />

            </Paper>
        </Grid>
    )
};

export default TodoList;
