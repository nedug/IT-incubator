import React from 'react';
import {SortedTask} from "./App";
import {Button} from "@material-ui/core";

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
            <Button
                variant={filteredTask === SortedTask.all ? 'contained' : 'text'}
                onClick={onClickFilterTask(SortedTask.all)}
            >
                All
            </Button>

            <Button
                color={"primary"}
                variant={filteredTask === SortedTask.active ? 'contained' : 'text'}
                onClick={onClickFilterTask(SortedTask.active)}
            >
                Active
            </Button>

            <Button
                color={"secondary"}
                variant={filteredTask === SortedTask.completed ? 'contained' : 'text'}
                onClick={onClickFilterTask(SortedTask.completed)}
            >
                Completed
            </Button>
        </div>
    );
};

export default ControlButtons;