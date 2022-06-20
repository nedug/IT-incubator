import React, { useEffect } from 'react';
import './CSS/App.css';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/icons/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './State/store';
import { initializeAppTC, RequestStatus } from './State/app-reducer';
import { ErrorSnackbar } from './Components/ErrorSnackbar';
import { Login } from './Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import { TodoListsList } from './TodoListsList';
import CircularProgress from '@material-ui/core/CircularProgress';
import { logoutTC } from './State/auth-reducer';


const App = () => {

    const requestStatus = useSelector<AppRootStateType, RequestStatus>(state => state.app.status);
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeAppTC() as any);
    }, []);

    if (!isInitialized) {
        return (
            <div
                style={{ position: 'fixed', top: '40%', textAlign: 'center', width: '100%' }}>
                <CircularProgress />
            </div>
        );
    }

    const logoutHandler = () => {
        dispatch(logoutTC() as any);
    };


    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar style={{ display: 'flex', justifyContent: isLoggedIn ? 'space-between' : 'center' }}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        TodoList
                    </Typography>

                    {isLoggedIn &&
                        <Button variant={'outlined'} color={'secondary'}
                                onClick={logoutHandler}>
                            Logout
                        </Button>
                    }
                </Toolbar>
            </AppBar>

            <div style={{ height: '20px' }}>
                {requestStatus === RequestStatus.loading && <LinearProgress color="secondary" />}
            </div>

            <Container fixed>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<TodoListsList />} />
                    <Route path="/404" element={<h2>404: PAGE NOT FOUND</h2>} />
                    <Route path="*" element={<Navigate to={'/404'} />} />
                </Routes>
            </Container>

            <ErrorSnackbar />

        </div>
    )
};

export default App;