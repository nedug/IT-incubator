import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';


export const Login = () => {
    return (
        <Grid container justifyContent="center">
            <Grid item xs={4}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'} rel="noreferrer"> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>

                        <TextField label="Email" margin="normal" />
                        <TextField label="Password" margin="normal" />
                        <FormControlLabel control={<Checkbox name="rememberMe" />} label={'Remember Me'} />
                        <Button type={'submit'} variant={'contained'} color={'secondary'}>Login</Button>

                    </FormGroup>
                </FormControl>

            </Grid>
        </Grid>
    )
};