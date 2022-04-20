import React, {ChangeEvent} from 'react';
import {Checkbox} from "@material-ui/core";

type CheckboxPropsType = {
    isDone: boolean
    callback: (checked: boolean) => void
}


const CheckboxCommon = React.memo(({isDone, callback}: CheckboxPropsType) => {

    console.log('CheckboxCommon')

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callback(e.currentTarget.checked)
    };

    return (
        <Checkbox
            size={"small"}
            checked={isDone}
            onChange={onChangeStatusHandler}
        />
    );
});

CheckboxCommon.displayName = 'CheckboxCommon';

export default CheckboxCommon;