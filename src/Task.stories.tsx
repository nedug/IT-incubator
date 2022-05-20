import React from "react";
import Task from "./Task";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";
import {ComponentStory} from "@storybook/react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./State/store";
import {TaskType} from "./TodoList";


export default {
    title: 'Todolist/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
};

const TaskUsingRedux = ({task}:{task: number}) => {

    const tasks = useSelector<AppRootStateType, TaskType>(state => state.tasks['TodoID1'][task]);

    return <Task {...tasks} todolistId={'TodoID1'}/>;
}

const Template: ComponentStory<typeof TaskUsingRedux> = () => <TaskUsingRedux task={0}/>;
const Template2: ComponentStory<typeof TaskUsingRedux> = () => <TaskUsingRedux task={1}/>;

export const TaskIsNotDone = Template.bind({});
export const TaskIsDone = Template2.bind({});


/*const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

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
};*/
