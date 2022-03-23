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
        if (!valueInput) return;
        if (e.key === 'Enter') {
            addNewTask(valueInput);
            setValueInput('');
        }
    };

    const onClickBtnHandler = () => {
        if (!valueInput) return;
        setValueInput('');
        addNewTask(valueInput);
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
