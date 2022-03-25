import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {addNewTaskType} from "./TodoList";

type AddTaskFormPropsType = {
    addNewTask: addNewTaskType
}

const AddTaskForm = ({addNewTask}: AddTaskFormPropsType) => {

    const [valueInput, setValueInput] = useState('');
    const [error, setError] = useState<null | string>(null);

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setValueInput(e.target.value);
    };

    const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickBtnHandler();
        }
    };

    const onClickBtnHandler = () => {
        if (!valueInput.trim()) {
            setError('Title is required');
            setValueInput('');
            return;
        }
        setValueInput('');
        addNewTask(valueInput.trim());
    };


    return (
        <div>
            <input value={valueInput}
                   onChange={onChangeInputHandler}
                   onKeyDown={onKeyDownInputHandler}
                   className={error ? 'error' : ''}
            />

            <button onClick={onClickBtnHandler}>+</button>

            {error && <div className='error-message'>{error}</div>}
        </div>
    );
};

export default AddTaskForm;
