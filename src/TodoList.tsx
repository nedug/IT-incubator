import React from "react";
import TodoListHeader from "./TodoListHeader";
import TaskList from "./TaskList";
import ControlButtons from "./ControlButtons";
import AddTaskForm from "./AddTaskForm";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

const TodoList = ({title, tasks}: TodolistPropsType) => (
    <div>

        <TodoListHeader title={title}/>

        <AddTaskForm/>

        <TaskList tasks={tasks}/>

        <ControlButtons/>

    </div>
);

export default TodoList;
