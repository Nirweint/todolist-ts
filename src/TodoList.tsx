import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TodoListPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType> // TaskType []
    removeTask: (taskId: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodolistTitle: (title: string, todoListId: string) => void
}
export const TodoList = (props: TodoListPropsType) => {

    const addTaskHandler = (title: string) => {
        props.addTask(title, props.id)
    }
    const filterTasksAll = () => props.changeFilter('all', props.id);
    const filterTasksActive = () => props.changeFilter('active', props.id);
    const filterTasksCompleted = () => props.changeFilter('completed', props.id);
    const removeTodoListHandler = () => {
        props.removeTodoList(props.id)
    };
    const changeTodolistTitleHandler = (title: string) => {
        props.changeTodolistTitle(title, props.id)
    }

    const tasksJSXElements = props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id, props.id)
        const changeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
        }
        const changeTaskTitleHandler = (title: string) => {
            props.changeTaskTitle(task.id, title, props.id)
        }
        return (
            <ListItem
                divider
                disableGutters
                style={{
                    display: 'flex',
                }}
                className={task.isDone ? "is-done" : ""}
                key={task.id}
            >
                <Checkbox
                    checked={task.isDone}
                    onChange={changeCheckboxHandler}
                    inputProps={{'aria-label': 'primary checkbox'}}
                />
                <EditableSpan title={task.title} setNewTitle={changeTaskTitleHandler}/>
                <IconButton aria-label="delete" onClick={removeTask} style={{justifySelf: 'flex-end'}}>
                    <Delete fontSize={"small"}/>
                </IconButton>
            </ListItem>
        )
    })

    return (
        <div className="todoList">
            <div className={"todoListTitle"}>
                <Typography variant={"h6"} style={{fontWeight: "bold"}} align={"center"}>
                    <EditableSpan title={props.title} setNewTitle={changeTodolistTitleHandler}/>
                    <IconButton aria-label="delete" onClick={removeTodoListHandler}>
                        <Delete/>
                    </IconButton>
                </Typography>
            </div>

            <AddItemForm addItem={addTaskHandler}/>

            <List>
                {tasksJSXElements}
            </List>
            <div>
                <ButtonGroup
                    variant={"contained"}
                    size={"small"}
                    disableElevation={true}
                >
                    <Button
                        color={props.filter === "all" ? 'secondary' : 'primary'}
                        onClick={filterTasksAll}
                    >All
                    </Button>
                    <Button
                        color={props.filter === "active" ? 'secondary' : 'primary'}
                        onClick={filterTasksActive}
                    >Active
                    </Button>
                    <Button
                        color={props.filter === "completed" ? 'secondary' : 'primary'}
                        onClick={filterTasksCompleted}
                    >Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
}