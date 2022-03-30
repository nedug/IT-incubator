import React from 'react';
import {FilterTaskType} from "./TodoList";
import {SortedTask} from "./App";

type ControlButtonsPropsType = {
    todoListID: string
    filterTask: FilterTaskType
    filteredTask: SortedTask
}


const ControlButtons = ({todoListID, filterTask, filteredTask}: ControlButtonsPropsType) => {

    const onClickFilterTask = (filter: SortedTask) => {
        return () => filterTask(filter, todoListID);
    };

    return (
        <div>
            <button
                onClick={onClickFilterTask(SortedTask.all)}
                className={filteredTask === SortedTask.all ? 'active-filter' : ''}
            >All</button>

            <button
                onClick={onClickFilterTask(SortedTask.active)}
                className={filteredTask === SortedTask.active ? 'active-filter' : ''}
            >Active</button>

            <button
                onClick={onClickFilterTask(SortedTask.completed)}
                className={filteredTask === SortedTask.completed ? 'active-filter' : ''}
            >Completed</button>
        </div>
    );
};

export default ControlButtons;