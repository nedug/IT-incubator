import React from "react";
import App from "./App";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";
import {ComponentStory} from "@storybook/react";


export default {
    title: 'App Component',
    component: App,
    decorators: [ReduxStoreProviderDecorator],
};

// export const AppExample = () => {
//     return <App/>
// };

const Template: ComponentStory<typeof App> = () => <App/>;

export const AppExample = Template.bind({});