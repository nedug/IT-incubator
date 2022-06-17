import React from 'react';
import './CSS/App.css';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/icons/Menu';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './State/store';
import { RequestStatus } from './State/app-reducer';
import { ErrorSnackbar } from './Components/ErrorSnackbar';
import { Login } from './Login';
import { Route, Routes } from 'react-router-dom';
import { TodoListsList } from './TodoListsList';


const App = () => {

    const requestStatus = useSelector<AppRootStateType, RequestStatus>(state => state.app.status);


    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        TodoList
                    </Typography>
                    <Button variant={'outlined'} color={'secondary'}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>

            <div style={{ height: '20px' }}>
                {requestStatus === RequestStatus.loading && <LinearProgress color="secondary" />}
            </div>

            <Container fixed>

                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<TodoListsList />} />
                    <Route path="*" element={<h2>404: PAGE NOT FOUND</h2>} />
                </Routes>

            </Container>

            <ErrorSnackbar />

        </div>
    )
};

export default App;