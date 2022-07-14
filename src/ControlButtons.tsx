import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { SortedTask } from './State/todolist-reducer';
import s from './CSS/ControlButtons.module.css';

type ControlButtonsPropsType = {
    filterTask: (filter: SortedTask) => void
    filteredTask: SortedTask
}


const ControlButtons = React.memo(({ filterTask, filteredTask }: ControlButtonsPropsType) => {

    const onClickFilterTask = useCallback((filter: SortedTask) => () => filterTask(filter), [filterTask]);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
                className={filteredTask === SortedTask.all ? undefined : s.notActive}
                size={'small'}
                disableElevation
                variant={filteredTask === SortedTask.all ? 'contained' : 'outlined'}
                onClick={onClickFilterTask(SortedTask.all)}
            >
                {SortedTask.all}
            </Button>

            <Button
                className={filteredTask === SortedTask.active ? undefined : s.notActive}
                size={'small'}
                color={'primary'}
                disableElevation
                variant={filteredTask === SortedTask.active ? 'contained' : 'outlined'}
                onClick={onClickFilterTask(SortedTask.active)}
            >
                {SortedTask.active}
            </Button>

            <Button
                className={filteredTask === SortedTask.completed ? undefined : s.notActive}
                size={'small'}
                color={'secondary'}
                disableElevation
                variant={filteredTask === SortedTask.completed ? 'contained' : 'outlined'}
                onClick={onClickFilterTask(SortedTask.completed)}
            >
                {SortedTask.completed}
            </Button>
        </div>
    );
});

ControlButtons.displayName = 'ControlButtons';

export default ControlButtons;