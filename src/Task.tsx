import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "./components/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./App";

type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, title: string) => void
}

export const Task: React.FC<TaskPropsType> = React.memo(({
                                                             removeTask, changeTaskTitle, changeTaskStatus, task
                                                         }) => {
    console.log("Task")
    const removeTaskHandler = () => {
        removeTask(task.id)
    }
    const changeTaskTitleHandler = useCallback((title: string) => {
        changeTaskTitle(task.id, title)
    }, [task.id, changeTaskTitle])
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id, e.currentTarget.checked)
    }

    return (
        <ListItem
            key={task.id}
            divider
            disableGutters
            style={{
                display: 'flex',
            }}
            className={task.isDone ? "is-done" : ""}
        >
            <Checkbox
                checked={task.isDone}
                onChange={changeTaskStatusHandler}
                inputProps={{'aria-label': 'primary checkbox'}}
            />
            <EditableSpan title={task.title} onChange={changeTaskTitleHandler}/>
            <IconButton aria-label="delete" onClick={removeTaskHandler} style={{justifySelf: 'flex-end'}}>
                <Delete fontSize={"small"}/>
            </IconButton>
        </ListItem>
    );
})