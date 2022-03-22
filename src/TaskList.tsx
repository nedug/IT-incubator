import React from 'react';
import Task from "./Task";
import {RemoveTaskType, TaskType} from "./TodoList";

type TaskListPropsType = {
    tasks: Array<TaskType>
    removeTask: RemoveTaskType
}

const TaskList = ({tasks, removeTask}: TaskListPropsType) => {
    return (
        <ul>
            {
                tasks.map(task =>
                    <Task key={task.id}
                          {...task}
                          removeTask={removeTask}
                    />)
            }
        </ul>
    );
};

export default TaskList;