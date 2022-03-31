import React from 'react';
import {EditableSpan} from "./EditableSpan";

type TodoListHeaderPropsType = {
    title: string
    removeTodolist: () => void
    changeTitleTodoListFromTodoList: (newInputValue: string) => void
}


const TodoListHeader = ({title, removeTodolist, changeTitleTodoListFromTodoList}: TodoListHeaderPropsType) => {

    const onClickHandler = () => {
        removeTodolist();
    };

    const changeTitleTodoList = (newInputValue: string) => {
        changeTitleTodoListFromTodoList(newInputValue);
    };


    return (
        <h3>
            <EditableSpan
                title={title}
                changeTitleTaskCallback={changeTitleTodoList}
            />

            <button onClick={onClickHandler}>x</button>
        </h3>
    )
};

export default TodoListHeader;