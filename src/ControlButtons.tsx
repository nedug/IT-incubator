import React from 'react';
import {Button} from "@material-ui/core";
import {SortedTask} from "./State/todoListReducer";

type ControlButtonsPropsType = {
    filterTask: (filter: SortedTask) => void
    filteredTask: SortedTask
}


const ControlButtons = ({filterTask, filteredTask}: ControlButtonsPropsType) => {

    const onClickFilterTask = (filter: SortedTask) => {
        return () => filterTask(filter);
    };

    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Button
                size={"small"}
                disableElevation
                variant={filteredTask === SortedTask.all ? 'contained' : 'outlined'}
                onClick={onClickFilterTask(SortedTask.all)}
            >
                {SortedTask.all}
            </Button>

            <Button
                size={"small"}
                color={"primary"}
                disableElevation
                variant={filteredTask === SortedTask.active ? 'contained' : 'outlined'}
                onClick={onClickFilterTask(SortedTask.active)}
            >
                {SortedTask.active}
            </Button>

            <Button
                size={"small"}
                color={"secondary"}
                disableElevation
                variant={filteredTask === SortedTask.completed ? 'contained' : 'outlined'}
                onClick={onClickFilterTask(SortedTask.completed)}
            >
                {SortedTask.completed}
            </Button>
        </div>
    );
};

export default ControlButtons;