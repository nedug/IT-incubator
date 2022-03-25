import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {addNewTaskType} from "./TodoList";

type AddTaskFormPropsType = {
    addNewTask: addNewTaskType
}

const AddTaskForm = ({addNewTask}: AddTaskFormPropsType) => {

    const [valueInput, setValueInput] = useState('');

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValueInput(e.target.value);
    };

    const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickBtnHandler();
        }
    };

    const onClickBtnHandler = () => {
        if (!valueInput.trim()) {
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
            />

            <button onClick={onClickBtnHandler}>+</button>
        </div>
    );
};

export default AddTaskForm;
