import React from 'react';
import {FilterTaskType} from "./TodoList";

type ControlButtonsPropsType = {
    filterTask: FilterTaskType
}

const ControlButtons = ({filterTask}: ControlButtonsPropsType) => {
    const onClickAllHandler = () => filterTask('all');
    const onClickActiveHandler = () => filterTask('active');
    const onClickCompletedHandler = () => filterTask('completed');

    return (
        <div>
            <button onClick={onClickAllHandler}>All</button>
            <button onClick={onClickActiveHandler}>Active</button>
            <button onClick={onClickCompletedHandler}>Completed</button>
        </div>
    );
};

export default ControlButtons;