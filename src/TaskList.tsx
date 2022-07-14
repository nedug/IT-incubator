import React, { CSSProperties } from 'react';
import Task from './Task';
import { useAppSelector } from './State/store';
import { SortedTask, TodoListCommonType } from './State/todolist-reducer';
import s from './CSS/TaskList.module.css';

type TaskListPropsType = {
    todolist: TodoListCommonType
}

const EmptyListStyle: CSSProperties = {
    fontSize: 'small',
    color: '#858585',
    padding: '10px',
};


const TaskList = React.memo(({ todolist }: TaskListPropsType) => {

    const tasks = useAppSelector(state => state.tasks[todolist.id]);

    const getFilteredTaskForRender = () => {
        switch (todolist.filter) {
            case SortedTask.active:
                return tasks.filter(task => !task.status);
            case SortedTask.completed:
                return tasks.filter(task => task.status);
            default:
                return tasks;
        }
    };


    return (
        tasks.length
            ?
            <div
                className={s.scroll}
                style={{
                    margin: '10px 0',
                    height: getFilteredTaskForRender().length > 4 ? '152px' : 'auto',
                    overflow: 'auto',
                }}
            >
                {
                    getFilteredTaskForRender().map(task => (
                        <Task key={task.id}
                              {...task}
                              todoListId={todolist.id}
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