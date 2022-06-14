import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import CheckBox from '@material-ui/icons/CheckBox';


export const Login = () => {
    return (
        <Grid container justifyContent="center">
            <Grid item xs={4}>
                <FormControl>
                    <FormLabel></FormLabel>
                    <FormGroup>
                        <TextField label="Email" margin="normal" />
                        <TextField label="Password" margin="normal" />
                        <FormControlLabel control={<CheckBox name="rememberMe" />} label={'Remember Me'} />
                        <Button type={'submit'} variant={'contained'} color={'secondary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>

            </Grid>
        </Grid>
    )
}