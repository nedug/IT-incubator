import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useAppDispatch, useAppSelector } from '../State/store';
import { setErrorAC } from '../State/app-reducer';

const Alert = (props: AlertProps) => <MuiAlert elevation={6} variant="filled" {...props} />;

export const ErrorSnackbar = () => {

    const dispatch = useAppDispatch();
    const error = useAppSelector(state => state.app.error);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setErrorAC(null));
    };

    return (
        <Snackbar open={!!error} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>
    );
};