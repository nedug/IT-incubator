import React from 'react';
import {FilterTaskType} from "./TodoList";

type ControlButtonsPropsType = {
    filterTask: FilterTaskType
}

const ControlButtons = ({filterTask}: ControlButtonsPropsType) => {
    return (
        <div>
            <button onClick={() => filterTask('all')}>All</button>
            <button onClick={() => filterTask('active')}>Active</button>
            <button onClick={() => filterTask('completed')}>Completed</button>
        </div>
    );
};

export default ControlButtons;