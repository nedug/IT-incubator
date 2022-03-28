import React from 'react';

type TodoListHeaderPropsType = {
    title: string
}


const TodoListHeader = ({title}: TodoListHeaderPropsType) => {
    return <h3>{title}</h3>
};

export default TodoListHeader;