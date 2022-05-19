import React from "react";
import App from "./App";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";


export default {
    title: 'App Component',
    component: App,
    decorators: [ReduxStoreProviderDecorator],
};

// const callback = action("EditableSpan changed value");

export const AppExample = () => {
    return <App/>
};