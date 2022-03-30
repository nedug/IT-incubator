import React, {CSSProperties} from 'react';
import Task from "./Task";
import {changeStatusTaskType, RemoveTaskType, TaskType} from "./TodoList";

type TaskListPropsType = {
    // todoListID: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeStatusTask: (taskID: string, isDone: boolean) => void
}

const EmptyListStyle: CSSProperties = {
    fontSize: "small",
    color: "green",
}


const TaskList = ({/*todoListID,*/ tasks, removeTask, changeStatusTask}: TaskListPropsType) => {

    return (
        tasks.length
            ?
            <ul>
                {
                    tasks.map(task =>
                        <Task key={task.id}
                              {...task}
                              // todoListID={todoListID}
                              removeTask={removeTask}
                              changeStatusTask={changeStatusTask}
                        />)
                }
            </ul>
            :
            <span style={EmptyListStyle}>TaskList is empty. Add new Task</span>
    );
};

export default TaskList;