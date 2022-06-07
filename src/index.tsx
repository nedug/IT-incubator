import React from 'react';
import './CSS/index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { Provider } from 'react-redux';
import { store } from './State/store';
import ReactDOM from 'react-dom/client';


const Theme = createTheme({
    palette: {
        type: 'dark',
    },
});


const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <Provider store={store}>

        <ThemeProvider theme={Theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>

    </Provider>
);