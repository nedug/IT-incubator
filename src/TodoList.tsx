import React, {useCallback} from "react";
import TodoListHeader from "./TodoListHeader";
import TaskList from "./TaskList";
import ControlButtons from "./ControlButtons";
import AddItemForm from "./AddItemForm";
import {Grid, Paper} from "@material-ui/core";
import {changeFilterTodolistAC, changeTitleTodolistAC, removeTodolistAC, SortedTask} from "./State/todoListReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./State/store";
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


const TodoList = React.memo(({todoList}: TodolistPropsType) => {

    console.log('TodoList')

    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todoList.id]);

    const dispatch = useDispatch();

    const removeTodolistCallback = useCallback(() => {
        dispatch(removeTodolistAC(todoList.id))
    }, [dispatch, todoList.id]);

    const filterTaskCallback = useCallback((filter: SortedTask) => {
        dispatch(changeFilterTodolistAC(todoList.id, filter))
    }, [dispatch, todoList.id]);

    const addNewTaskCallback = useCallback((valueInputTrim: string) => {
        dispatch(addTaskAC(todoList.id, valueInputTrim));

        if (todoList.filter === SortedTask.completed) {
            filterTaskCallback(SortedTask.active);
        }
    }, [dispatch, filterTaskCallback, todoList.id, todoList.filter]);

    const removeTaskCallback = useCallback((taskID: string) => {
        dispatch(removeTaskAC(todoList.id, taskID))
    }, [dispatch, todoList.id]);

    const changeStatusTaskCallback = useCallback((taskID: string, isDone: boolean) => {
        dispatch(changeStatusTaskAC(todoList.id, taskID, isDone))
    }, [dispatch, todoList.id]);

    const changeTitleTask = useCallback((TaskID: string, newInputValue: string) => {
        dispatch(changeTitleTaskAC(todoList.id, TaskID, newInputValue))
    }, [dispatch, todoList.id]);

    const changeTitleTodoList = useCallback((newInputValue: string) => {
        dispatch(changeTitleTodolistAC(todoList.id, newInputValue))
    }, [dispatch, todoList.id]);

    


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
});

TodoList.displayName = 'TodoList';

export default TodoList;
