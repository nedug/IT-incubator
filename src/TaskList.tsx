import React from 'react';
import Task from "./Task";
import {changeStatusTaskType, RemoveTaskType, TaskType} from "./TodoList";

type TaskListPropsType = {
    tasks: Array<TaskType>
    removeTask: RemoveTaskType
    changeStatusTask: changeStatusTaskType
}

const TaskList = ({tasks, removeTask, changeStatusTask}: TaskListPropsType) => {
    return (
        <ul>
            {
                tasks.map(task =>
                    <Task key={task.id}
                          {...task}
                          removeTask={removeTask}
                          changeStatusTask={changeStatusTask}
                    />)
            }
        </ul>
    );
};

export default TaskList;