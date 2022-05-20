import React from "react";
import App from "./App";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";
import {ComponentStory} from "@storybook/react";


export default {
    title: 'App/App Component',
    component: App,
    decorators: [ReduxStoreProviderDecorator],
};

const Template: ComponentStory<typeof App> = (args ) => <App />;

export const AppExample = Template.bind({});