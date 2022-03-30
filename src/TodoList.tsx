import React from "react";
import TodoListHeader from "./TodoListHeader";
import TaskList from "./TaskList";
import ControlButtons from "./ControlButtons";
import AddTaskForm from "./AddTaskForm";
import {SortedTask} from "./App";

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


const TodoList = ({todoListID, title, tasks, removeTask, filterTask, addNewTask, changeStatusTask, filteredTask, removeTodolist}: TodolistPropsType) => (
    <div>
        <TodoListHeader
            todoListID={todoListID}
            title={title}
            removeTodolist={removeTodolist}
        />

        <AddTaskForm
            todoListID={todoListID}
            addNewTask={addNewTask}
        />

        <TaskList
            todoListID={todoListID}
            tasks={tasks}
            removeTask={removeTask}
            changeStatusTask={changeStatusTask}
        />

        <ControlButtons
            todoListID={todoListID}
            filterTask={filterTask}
            filteredTask={filteredTask}
        />
    </div>
);

export default TodoList;
