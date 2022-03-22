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
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type RemoveTaskType = (id: number) => void
export type FilterTaskType = (filter: FilterTask) => void

const TodoList = ({title, tasks, removeTask, filterTask}: TodolistPropsType) => (
    <div>
        <TodoListHeader title={title}/>
        <AddTaskForm/>
        <TaskList tasks={tasks}
                  removeTask={removeTask}
        />
        <ControlButtons filterTask={filterTask}/>
    </div>
);

export default TodoList;
