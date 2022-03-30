import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {addNewTaskType} from "./TodoList";
import classes from './Error.module.css';
// import styled from 'styled-components';

// const ErrorMessage = styled.div`
//     color: red;
// `;

type AddTaskFormPropsType = {
    todoListID: string
    addNewTask: addNewTaskType
}


const AddTaskForm = ({todoListID, addNewTask}: AddTaskFormPropsType) => {

    const [valueInput, setValueInput] = useState('');
    const [error, setError] = useState<boolean>(false);
    // const [error, setError] = useState<null | string>(null);

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

        addNewTask(valueInputTrim, todoListID);
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
            {/*{error && <ErrorMessage>Title is required</ErrorMessage>}*/}
        </div>
    );
};

export default AddTaskForm;
