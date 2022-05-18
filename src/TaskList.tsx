import React, {CSSProperties, useCallback} from 'react';
import Task from "./Task";
import {TaskType} from "./TodoList";

type TaskListPropsType = {
    tasks: Array<TaskType>
    todolistId: string
    // removeTask: (id: string) => void
    // changeStatusTask: (taskID: string, isDone: boolean) => void
    // changeTitleTaskFromTodoList: (TaskID: string, newInputValue: string) => void
}

const EmptyListStyle: CSSProperties = {
    fontSize: "small",
    color: "#858585",
    padding: "10px",
}


const TaskList = React.memo(({todolistId, tasks, /*removeTask, changeStatusTask, changeTitleTaskFromTodoList*/}: TaskListPropsType) => {

    console.log('TaskList')

    /*const changeTitleTask = useCallback((TaskID: string, newInputValue: string) => {
        changeTitleTaskFromTodoList(TaskID, newInputValue);
    }, [changeTitleTaskFromTodoList]);*/


    return (
        tasks.length
            ?
            <div style={{margin: '10px 0'}}>
                {
                    tasks.map(task => (
                        <Task key={task.id}
                              {...task}
                              todolistId={todolistId}
                              // removeTask={removeTask}
                              // changeStatusTask={changeStatusTask}
                              // changeTitleTaskFromTaskList={changeTitleTask}
                        />
                    ))
                }
            </div>
            :
            <div style={EmptyListStyle}>TaskList is empty. Add new Task</div>
    );
});

TaskList.displayName = 'TaskList';

export default TaskList;