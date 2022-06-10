import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';
import { IconButton, TextField } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../State/store';
import { RequestStatus } from '../State/app-reducer';

type AddItemFormPropsType = {
    addNewItem: (valueInput: string) => void
}


const AddItemForm = React.memo(({ addNewItem }: AddItemFormPropsType) => {

    const requestStatus = useSelector<AppRootStateType, RequestStatus>(state => state.app.status);

    const [valueInput, setValueInput] = useState('');
    const [error, setError] = useState(false);

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(false);
        }
        setValueInput(e.target.value);
    };

    const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && requestStatus !== RequestStatus.loading) {
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
                disabled={requestStatus === RequestStatus.loading}
            >
                <AddCircleOutlineOutlinedIcon />
            </IconButton>
        </div>
    );
});

AddItemForm.displayName = 'AddItemForm'; /* Для ESLint */

export default AddItemForm;
