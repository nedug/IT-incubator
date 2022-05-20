import AddItemForm from "./AddItemForm";
import React from "react";
import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";


export default {
    title: 'Todolist/AddItemForm Component',
    component: AddItemForm,
    argTypes: {
        addNewItem: {
            description: "Button '+' was pressed from form and return value",
        },
    },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args}/>;

export const AddItemFormExample = Template.bind({});

AddItemFormExample.args = {
    addNewItem: action("Button '+' was pressed from form and return value"),
};