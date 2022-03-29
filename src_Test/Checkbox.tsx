import React, {ChangeEvent} from 'react';

type CheckboxProsType = {
    isDone: boolean
    callback: (checked: boolean) => void
}

const Checkbox = ({isDone, callback}: CheckboxProsType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callback(e.currentTarget.checked);
    };

    return (

        <input
            type="checkbox"

            checked={isDone}

            // onChange={(e) => callback(e.currentTarget.checked)}
            onChange={onChangeHandler}
        />

    );
};

export default Checkbox;