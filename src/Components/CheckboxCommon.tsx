import React, {ChangeEvent} from 'react';
import {Checkbox} from "@material-ui/core";
import {TasksStatus} from '../API/API';

type CheckboxPropsType = {
    status: TasksStatus
    callback: (checked: boolean) => void
}


const CheckboxCommon = React.memo(({status, callback}: CheckboxPropsType) => {

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callback(e.currentTarget.checked)
    };

    return (
        <Checkbox
            size={"small"}
            checked={status === TasksStatus.Completed}
            onChange={onChangeStatusHandler}
        />
    );
});

CheckboxCommon.displayName = 'CheckboxCommon';

export default CheckboxCommon;