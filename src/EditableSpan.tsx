import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
    title: string
    changeTitleTaskCallback: (newInputValue: string) => void
}


export const EditableSpan = ({title, changeTitleTaskCallback}: EditableSpanType) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');

    const onDoubleClickSpanHandler = () => {
        setEditMode(true);
        setInputValue(title);
    };

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    };

    const onBlurInputHandler = () => {
        setEditMode(false);
        changeTitleTaskCallback(inputValue);
    };


    return editMode
        ?
        <input
            value={inputValue}
            onChange={onChangeInputHandler}
            onBlur={onBlurInputHandler}
            autoFocus={true}
        />
        :
        <span
            onDoubleClick={onDoubleClickSpanHandler}
        >{title}</span>
};