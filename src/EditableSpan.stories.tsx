import React from "react";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";
import {ComponentMeta, ComponentStory} from "@storybook/react";


export default {
    title: 'Todolist/EditableSpan Component',
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