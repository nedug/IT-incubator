import React from 'react';
import Task from "./Task";
import {TaskType} from "./TodoList";

type TaskListPropsType = {
    tasks: Array<TaskType>
}

const TaskList = ({tasks}: TaskListPropsType) => {
    return (
        <ul>
            <Task {...tasks[0]} />
            <Task {...tasks[1]} />
            <Task {...tasks[2]} />
        </ul>
    );
};

export default TaskList;