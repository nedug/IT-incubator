import React from "react";
import TodoListHeader from "./TodoListHeader";
import TaskList from "./TaskList";
import ControlButtons from "./ControlButtons";
import AddTaskForm from "./AddTaskForm";
import {FilterTask} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: RemoveTaskType
    filterTask: FilterTaskType
    addNewTask: addNewTaskType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type RemoveTaskType = (id: string) => void
export type FilterTaskType = (filter: FilterTask) => void
export type addNewTaskType = (valueInput: string) => void


const TodoList = ({title, tasks, removeTask, filterTask, addNewTask}: TodolistPropsType) => (
    <div>
        <TodoListHeader title={title}/>

        <AddTaskForm addNewTask={addNewTask}/>

        <TaskList tasks={tasks}
                  removeTask={removeTask}
        />

        <ControlButtons filterTask={filterTask}/>
    </div>
);

export default TodoList;
