import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

type AddItemFormPropsType = {
    addNewItem: (valueInput: string) => void
    disabled?: boolean
}


const AddItemForm = React.memo(({ addNewItem, disabled = false }: AddItemFormPropsType) => {

    const [valueInput, setValueInput] = useState('');
    const [error, setError] = useState(false);

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(false);
        }
        setValueInput(e.target.value);
    };

    const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !disabled) {
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
        <div style={{ display: 'flex', alignItems: 'center', }}>
            <TextField
                size={'small'}
                variant={'outlined'}
                label={error ? 'empty value' : 'type value'}
                value={valueInput}
                className={error ? 'error' : ''}
                error={error}
                helperText={error && 'Title is required'}
                onChange={onChangeInputHandler}
                onKeyDown={onKeyDownInputHandler}
            />

            <IconButton
                size={'small'}
                color={'primary'}
                onClick={onClickBtnHandler}
                disabled={disabled}
            >
                <AddCircleOutlineOutlinedIcon />
            </IconButton>
        </div>
    );
});

AddItemForm.displayName = 'AddItemForm'; /* Для ESLint */

export default AddItemForm;
