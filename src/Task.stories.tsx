import React from 'react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    title: 'Todolist/Task',
    component: Task,
} as ComponentMeta<typeof Task>;

const removeTaskCallback = action("Status changed inside Task")
const changeTaskStatusCallback = action("Title changed inside Task")
const changeTaskTitleCallback = action("Remove Button inside Task clicked")

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />


const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback,
}

export const TaskIsDoneExample = Template.bind({})
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: "1", isDone: true, title: "JS"},
}

export const TaskIsNotDoneExample = Template.bind({})
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: "1", isDone: false, title: "JS"},
}