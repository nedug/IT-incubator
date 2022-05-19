import AddItemForm from "./AddItemForm";
import React from "react";
import {action} from "@storybook/addon-actions";


export default {
    title: 'AddItemForm Component',
    component: AddItemForm,
};

const callback = action("Button '+' was pressed from form and return value");

export const AddItemFormExample = () => {
  return <AddItemForm addNewItem={callback}/>
};