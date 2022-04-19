import React, {CSSProperties} from 'react';
import Task from "./Task";
import {TaskType} from "./TodoList";

type TaskListPropsType = {
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeStatusTask: (taskID: string, isDone: boolean) => void
    changeTitleTaskFromTodoList: (TaskID: string, newInputValue: string) => void
}

const EmptyListStyle: CSSProperties = {
    fontSize: "small",
    color: "#858585",
    padding: "10px",
}


const TaskList = ({tasks, removeTask, changeStatusTask, changeTitleTaskFromTodoList}: TaskListPropsType) => {

    const changeTitleTask = (TaskID: string, newInputValue: string) => {
        changeTitleTaskFromTodoList(TaskID, newInputValue);
    };


    return (
        tasks.length
            ?
            <div style={{margin: '10px 0'}}>
                {
                    tasks.map(task => (
                        <Task key={task.id}
                              {...task}
                              removeTask={removeTask}
                              changeStatusTask={changeStatusTask}
                              changeTitleTaskFromTaskList={changeTitleTask}
                        />
                    ))
                }
            </div>
            :
            <div style={EmptyListStyle}>TaskList is empty. Add new Task</div>
    );
};

export default TaskList;