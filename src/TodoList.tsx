import React from "react";
import TodoListHeader from "./TodoListHeader";
import TaskList from "./TaskList";
import ControlButtons from "./ControlButtons";
import AddTaskForm from "./AddTaskForm";
import {SortedTask} from "./App";

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: RemoveTaskType
    filterTask: FilterTaskType
    addNewTask: addNewTaskType
    changeStatusTask: changeStatusTaskType
    filteredTask: SortedTask
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type RemoveTaskType = (id: string) => void
export type FilterTaskType = (filter: SortedTask, id: string) => void
export type addNewTaskType = (valueInput: string) => void
export type changeStatusTaskType = (taskID: string, isDone: boolean) => void


const TodoList = ({id, title, tasks, removeTask, filterTask, addNewTask, changeStatusTask, filteredTask}: TodolistPropsType) => (
    <div>
        <TodoListHeader title={title}/>

        <AddTaskForm addNewTask={addNewTask}/>

        <TaskList tasks={tasks}
                  removeTask={removeTask}
                  changeStatusTask={changeStatusTask}
        />

        <ControlButtons
            filterTask={filterTask}
            filteredTask={filteredTask}
            id={id}
        />
    </div>
);

export default TodoList;
