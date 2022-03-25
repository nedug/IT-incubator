import React from "react";
import TodoListHeader from "./TodoListHeader";
import TaskList from "./TaskList";
import ControlButtons from "./ControlButtons";
import AddTaskForm from "./AddTaskForm";
import {SortedTask} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: RemoveTaskType
    filterTask: FilterTaskType
    addNewTask: addNewTaskType
    changeStatusTask: changeStatusTaskType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type RemoveTaskType = (id: string) => void
export type FilterTaskType = (filter: SortedTask) => void
export type addNewTaskType = (valueInput: string) => void
export type changeStatusTaskType = (taskID: string, isDone: boolean) => void


const TodoList = ({title, tasks, removeTask, filterTask, addNewTask, changeStatusTask}: TodolistPropsType) => (
    <div>
        <TodoListHeader title={title}/>

        <AddTaskForm addNewTask={addNewTask}/>

        <TaskList tasks={tasks}
                  removeTask={removeTask}
                  changeStatusTask={changeStatusTask}
        />

        <ControlButtons filterTask={filterTask}/>
    </div>
);

export default TodoList;
