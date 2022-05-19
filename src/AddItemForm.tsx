import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

type AddItemFormPropsType = {
    addNewItem: (valueInput: string) => void
}


const AddItemForm = React.memo( ({addNewItem}: AddItemFormPropsType) => {

    const [valueInput, setValueInput] = useState('');
    const [error, setError] = useState(false);

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(false);
        }
        setValueInput(e.target.value);
    };

    const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickBtnHandler();
        }
    };

    const onClickBtnHandler = useCallback(() => {
        const valueInputTrim = valueInput.trim();
        if (!valueInputTrim) {
            setError(true);
            setValueInput('');
            return;
        }
        setValueInput('');

        addNewItem(valueInputTrim);
    }, [addNewItem, valueInput]);


    return (
        <div style={{display: 'flex', alignItems: 'center',}}>
            <TextField
                size={"small"}
                variant={"outlined"}
                label={error ? 'empty value' : 'type value'}
                value={valueInput}
                className={error ? 'error' : ''}
                error={error}
                helperText={error && 'Title is required'}
                onChange={onChangeInputHandler}
                onKeyDown={onKeyDownInputHandler}
            />

            <IconButton
                size={"small"}
                color={"primary"}
                onClick={onClickBtnHandler}
            >
                <AddCircleOutlineOutlinedIcon/>
            </IconButton>
        </div>
    );
});

AddItemForm.displayName = 'AddItemForm'; /* Для ESLint */

export default AddItemForm;
