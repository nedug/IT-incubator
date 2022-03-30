import React from 'react';
import {removeTodolistType} from "./TodoList";

type TodoListHeaderPropsType = {
    // todoListID: string
    title: string
    removeTodolist: /*removeTodolistType*/ () => void
}


const TodoListHeader = ({/*todoListID,*/ title, removeTodolist}: TodoListHeaderPropsType) => {

    const onClickHandler = () => {
        removeTodolist(/*todoListID*/);
    };

    return <h3>{title}
        <button onClick={onClickHandler}>x</button>
    </h3>
};

export default TodoListHeader;