import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { useFormik } from 'formik';
import { loginTC } from './State/auth-reducer';
import { useAppDispatch, useAppSelector } from './State/store';
import { Navigate } from 'react-router-dom';


export const Login = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const dispatch = useAppDispatch();

    // Хук formik
    const formik = useFormik({
        initialValues: {
            email: 'ru55nedug@gmail.com',
            password: '2424Online',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password is required';
            } else if (values.password.length < 3) {
                errors.password = 'Length of email can\'t be less 3 symbols';
            } else if (values.password.length > 15) {
                errors.password = 'Length of email can\'t be more 15 symbols';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values));
            formik.resetForm();
        },
    });

    if (isLoggedIn) { /* Переадресация после успешной логинизации */
        return <Navigate to={'/'} />
    }


    return (
        <Grid container justifyContent="center">
            <Grid item xs={4}>

                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>Версия для демонстрации работы приложения</p>
                            <p>Используйте предсохраненный имейл и пароль</p>
                        </FormLabel>
                        <FormGroup>

                            <TextField
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email && <div style={{ color: 'red' }}>{formik.errors.email}</div>}

                            <TextField
                                type="Password"
                                label="Password"
                                margin="normal"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password && <div style={{ color: 'red' }}>{formik.errors.password}</div>}

                            <FormControlLabel
                                control={<Checkbox checked={formik.values.rememberMe} {...formik.getFieldProps('rememberMe')} />}
                                label={'Remember Me'} />

                            <Button
                                type={'submit'}
                                variant={'contained'}
                                color={'secondary'}
                            >
                                Login
                            </Button>

                        </FormGroup>
                    </FormControl>
                </form>

            </Grid>
        </Grid>
    )
};


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}