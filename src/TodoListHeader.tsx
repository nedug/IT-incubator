import React from 'react';

type TodoListHeaderPropsType = {
    title: string
    removeTodolist: () => void
}


const TodoListHeader = ({title, removeTodolist}: TodoListHeaderPropsType) => {

    const onClickHandler = () => {
        removeTodolist();
    };

    return <h3>{title}
        <button onClick={onClickHandler}>x</button>
    </h3>
};

export default TodoListHeader;