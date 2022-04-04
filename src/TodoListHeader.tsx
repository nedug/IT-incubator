import React from 'react';
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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

            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </h3>
    )
};

export default TodoListHeader;