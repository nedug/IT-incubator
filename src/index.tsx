import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import {CssBaseline} from "@material-ui/core";
import {Provider} from "react-redux";
import {store} from "./State/state";

const Theme = createTheme({
    palette: {
        type: 'dark',
    },
});


ReactDOM.render(
    <Provider store={store}>

        <ThemeProvider theme={Theme}>
            <CssBaseline/>
            <App/>
        </ThemeProvider>

    </Provider>,

    document.getElementById('root')
);