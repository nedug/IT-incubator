import React from 'react';
import './CSS/index.css';
import App from './App';
import createTheme from '@material-ui/core/styles/createTheme';
import { ThemeProvider } from '@material-ui/core/styles/';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import { store } from './State/store';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';


const Theme = createTheme({
    palette: {
        type: 'dark',
    },
});


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Provider store={store}>
        <BrowserRouter>

            <ThemeProvider theme={Theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>

        </BrowserRouter>
    </Provider>
);