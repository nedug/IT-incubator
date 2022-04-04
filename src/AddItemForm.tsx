import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import classes from './Error.module.css';

type AddItemFormPropsType = {
    addNewItem: (valueInput: string) => void
}


const AddItemForm = ({addNewItem}: AddItemFormPropsType) => {

    const [valueInput, setValueInput] = useState('');
    const [error, setError] = useState<boolean>(false);

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false);
        setValueInput(e.target.value);
    };

    const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickBtnHandler();
        }
    };

    const onClickBtnHandler = () => {
        const valueInputTrim = valueInput.trim();
        if (!valueInputTrim) {
            setError(true);
            setValueInput('');
            return;
        }
        setValueInput('');

        addNewItem(valueInputTrim);
    };


    return (
        <div>
            <input value={valueInput}
                   className={error ? 'error' : ''}
                   onChange={onChangeInputHandler}
                   onKeyDown={onKeyDownInputHandler}
            />

            <button onClick={onClickBtnHandler}>+</button>

            {error && <div className={classes.error__message}>Title is required</div>}
        </div>
    );
};

export default AddItemForm;
