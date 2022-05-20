import React from "react";
import Task from "./Task";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";
import {ComponentStory} from "@storybook/react";


export default {
    title: 'Todolist/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
};

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsNotDone = Template.bind({});
TaskIsNotDone.args = {
    id: 'TaskID-1',
    title: 'HTML&CSS',
    isDone: true,
    todolistId: 'TodoID1',
};

export const TaskIsDone = Template.bind({});
TaskIsDone.args = {
    id: 'TaskID-2',
    title: 'Book',
    isDone: false,
    todolistId: 'TodoID2',
};
