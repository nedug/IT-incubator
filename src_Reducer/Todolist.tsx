import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import Checkbox from "./Checkbox";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatusTask: (taskID: string, isDone: boolean) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")

    const addTask = () => {
        props.addTask(title);
        setTitle("");
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");


    const onClickHandler = (ID: string) => {
        props.removeTask(ID);
    }

    const onChangeStatusHandler = (tID: string, checked: boolean) => {
        props.changeStatusTask(tID, checked);
    };


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
            />
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    // const onClickHandler = () => props.removeTask(t.id)

                    // const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    //    props.changeStatusTask(t.id, e.currentTarget.checked)
                    // };

                    return <li key={t.id}>

                        <Checkbox
                            isDone={t.isDone}
                            callback={(checked) => onChangeStatusHandler(t.id, checked)}
                        />

                        {/*<input*/}
                        {/*    type="checkbox"*/}
                        {/*    checked={t.isDone}*/}
                        {/*    onChange={(e) => onChangeStatusHandler(t.id, e.target.checked)}*/}
                        {/*/>*/}

                        <span>{t.title}</span>
                        <button onClick={() => onClickHandler(t.id)}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={ onAllClickHandler }>All</button>
            <button onClick={ onActiveClickHandler }>Active</button>
            <button onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
}
