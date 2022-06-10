import React from 'react';
import { ComponentStory } from '@storybook/react';
import App from '../App';
import { ReduxStoreProviderDecorator } from './ReduxStoreProviderDecorator';


export default {
    title: 'App/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator],
};

const Template: ComponentStory<typeof App> = () => <App />;

export const AppExample = Template.bind({});