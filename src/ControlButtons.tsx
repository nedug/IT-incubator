import React from 'react';
import {FilterTaskType} from "./TodoList";
import {SortedTask} from "./App";

type ControlButtonsPropsType = {
    filterTask: FilterTaskType
}

const ControlButtons = ({filterTask}: ControlButtonsPropsType) => {

    const onClickFilterTask = (filter: SortedTask) => {
        return () => filterTask(filter);
    };

    return (
        <div>
            <button onClick={onClickFilterTask(SortedTask.all)}>All</button>
            <button onClick={onClickFilterTask(SortedTask.active)}>Active</button>
            <button onClick={onClickFilterTask(SortedTask.completed)}>Completed</button>
        </div>
    );
};

export default ControlButtons;