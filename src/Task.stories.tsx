import React from "react";
import Task from "./Task";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";
import {ComponentStory} from "@storybook/react";


export default {
    title: 'Task Component',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
};

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const Task1 = Template.bind({});
Task1.args = {
    id: 'TaskID-2',
    title: 'HTML',
    isDone: false,
    todolistId: 'TodoID2',
};

export const Task2 = Template.bind({});
Task2.args = {
    id: 'TaskID-1',
    title: 'CSS',
    isDone: true,
    todolistId: 'TodoID1',
};


/*
export const TaskExample = () => {
    return (
            <>
                <Task
                    id={'TaskID-2'}
                    title={'HTML'}
                    isDone={true}
                    todolistId={'TodoID1'}
                />
                <Task
                    id={'TaskID-1'}
                    title={'CSS'}
                    isDone={false}
                    todolistId={'TodoID2'}
                />
            </>
    )
};*/
