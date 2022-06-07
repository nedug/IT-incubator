import React from "react";
import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {EditableSpan} from "../Components/EditableSpan";


export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    argTypes: {
        addNewItem: {
            description: 'EditableSpan changed value',
        },
    },
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}/>;

export const EditableSpanExample = Template.bind({});

EditableSpanExample.args = {
    title: 'Start Value',
    changeTitleTaskCallback: action("EditableSpan changed value"),
};