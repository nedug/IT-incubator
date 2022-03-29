import React, {ChangeEvent} from 'react';

type CheckboxPropsType = {
    isDone: boolean
    callback: (checked: boolean) => void
}


const Checkbox = ({isDone, callback}: CheckboxPropsType) => {

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callback(e.currentTarget.checked)
    };

    return (
        <input
            type="checkbox"
            checked={isDone}
            onChange={onChangeStatusHandler}
        />
    );
};

export default Checkbox;