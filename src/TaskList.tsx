import React, {CSSProperties} from 'react';
import Task from "./Task";
import {TaskType} from "./TodoList";
import {TodoListAllStateType} from "./App";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./State/store";
import {SortedTask} from "./State/todoListReducer";

type TaskListPropsType = {
    todolist: TodoListAllStateType
}

const EmptyListStyle: CSSProperties = {
    fontSize: "small",
    color: "#858585",
    padding: "10px",
}


const TaskList = React.memo(({todolist,}: TaskListPropsType) => {

    console.log('TaskList')

    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolist.id]);


    const getFilteredTaskForRender = () => {
        switch (todolist.filter) {
            case SortedTask.active:
                return tasks.filter(task => !task.isDone);
            case SortedTask.completed:
                return tasks.filter(task => task.isDone);
            default:
                return tasks;
        }
    }


    return (
        tasks.length
            ?
            <div style={{margin: '10px 0'}}>
                {
                    getFilteredTaskForRender().map(task => (
                        <Task key={task.id}
                              {...task}
                              todolistId={todolist.id}
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