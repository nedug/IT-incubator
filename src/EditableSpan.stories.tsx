import React from "react";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";


export default {
    title: 'EditableSpan Component',
    component: EditableSpan,
};

const callback = action("EditableSpan changed value");

export const EditableSpanExample = () => {
    return <EditableSpan title={'Start Value'} changeTitleTaskCallback={callback}/>
};