import React, { useCallback, useEffect } from 'react';
import TodoListHeader from './TodoListHeader';
import TaskList from './TaskList';
import ControlButtons from './ControlButtons';
import AddItemForm from './Components/AddItemForm';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { changeFilterTodolistAC, changeTitleTodolistTC, removeTodolistTC, SortedTask, TodoListCommonType } from './State/todolist-reducer';
import { addNewTasksTC, fetchTasksTC } from './State/tasks-reducer';
import { RequestStatus } from './State/app-reducer';
import { useAppDispatch } from './State/store';

type TodolistPropsType = {
    todoList: TodoListCommonType
}


const TodoList = React.memo(({ todoList }: TodolistPropsType) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTasksTC(todoList.id))
    }, []);

    const removeTodolistCallback = useCallback(() => {
        dispatch(removeTodolistTC(todoList.id))
    }, [dispatch, todoList.id]);

    const filterTaskCallback = useCallback((filter: SortedTask) => {
        dispatch(changeFilterTodolistAC({ todolistId: todoList.id, filter }))
    }, [dispatch, todoList.id]);

    const addNewTaskCallback = useCallback((valueInputTrim: string) => {
        dispatch(addNewTasksTC({ todolistId: todoList.id, title: valueInputTrim }));

        if (todoList.filter === SortedTask.completed) {
            filterTaskCallback(SortedTask.active);
        }
    }, [dispatch, filterTaskCallback, todoList.id, todoList.filter]);

    const changeTitleTodoList = useCallback((newInputValue: string) => {
        dispatch(changeTitleTodolistTC({ todolistId: todoList.id, title: newInputValue }))
    }, [dispatch, todoList.id]);


    return (
        <Grid item>
            <Paper elevation={4} style={{ padding: '20px' }}>
                <TodoListHeader
                    title={todoList.title}
                    entityStatus={todoList.entityStatus}
                    removeTodolist={removeTodolistCallback}
                    changeTitleTodoListFromTodoList={changeTitleTodoList}
                />

                <AddItemForm
                    addNewItem={addNewTaskCallback}
                    disabled={todoList.entityStatus === RequestStatus.loading}
                />

                <TaskList
                    todolist={todoList}
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
