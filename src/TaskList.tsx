import React, {CSSProperties} from 'react';
import Task from "./Task";
import {changeStatusTaskType, RemoveTaskType, TaskType} from "./TodoList";

type TaskListPropsType = {
    tasks: Array<TaskType>
    removeTask: RemoveTaskType
    changeStatusTask: changeStatusTaskType
}

const EmptyListStyle: CSSProperties = {
    fontSize: "small",
    color: "green",
}


const TaskList = ({tasks, removeTask, changeStatusTask}: TaskListPropsType) => {

    const onChangeHandler = (tID: string, checked: boolean) => { /* Вынос функции наверх */
        changeStatusTask(tID, checked);
    };

    return (
        tasks.length
            ?
            <ul>
                {
                    tasks.map(task =>
                        <Task key={task.id}
                              {...task}
                              removeTask={removeTask}
                              callback={(checked) => onChangeHandler(task.id, checked)}
                              // changeStatusTask={changeStatusTask}
                        />)
                }
            </ul>
            :
            <span style={EmptyListStyle}>TaskList is empty. Add new Task</span>
    );
};

export default TaskList;