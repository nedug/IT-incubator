import React from 'react';
import {SortedTask} from "./App";

type ControlButtonsPropsType = {
    filterTask: (filter: SortedTask) => void
    filteredTask: SortedTask
}


const ControlButtons = ({filterTask, filteredTask}: ControlButtonsPropsType) => {

    const onClickFilterTask = (filter: SortedTask) => {
        return () => filterTask(filter);
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