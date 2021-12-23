import React, {useCallback} from 'react';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, ButtonGroup, IconButton, List, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {FilterValuesType, TaskType} from "./App";
import {Task} from "./Task";

type TodoListPropsType = {
    todolistId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType> // TaskType []
    removeTask: (taskId: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTodolistTitle: (title: string, todoListId: string) => void
}
export const TodoList = React.memo(({
                                        addTask, title, filter, tasks, removeTask,
                                        changeFilter, changeTaskStatus, removeTodoList,
                                        todolistId, changeTodolistTitle, changeTaskTitle
                                    }: TodoListPropsType) => {
    console.log("Todolist")
    const addTaskHandler = useCallback((title: string) => {
        addTask(title, todolistId)
    }, [addTask, todolistId])
    const filterTasksAll = useCallback(() => changeFilter('all', todolistId), [changeFilter, todolistId])
    const filterTasksActive = useCallback(() => changeFilter('active', todolistId), [changeFilter, todolistId])
    const filterTasksCompleted = useCallback(() => changeFilter('completed', todolistId), [changeFilter, todolistId])
    const removeTodoListHandler = useCallback(() => {
        removeTodoList(todolistId)
    }, [removeTodoList, todolistId])
    const changeTodolistTitleHandler = useCallback((title: string) => {
        changeTodolistTitle(title, todolistId)
    }, [changeTodolistTitle, todolistId])


    const removeTaskHandler = useCallback((taskId: string) => removeTask(taskId, todolistId), [removeTask, todolistId])
    const changeCheckboxHandler = useCallback((taskId: string, isDone: boolean) => {
        changeTaskStatus(taskId, isDone, todolistId)
    }, [changeTaskStatus, todolistId])
    const changeTaskTitleHandler = useCallback((taskId: string, title: string) => {
        changeTaskTitle(taskId, title, todolistId)
    }, [changeTaskTitle, todolistId])

    if (filter === "active") {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone)
    }


    return (
        <div className="todoList">
            <div className={"todoListTitle"}>
                <Typography variant={"h6"} style={{fontWeight: "bold"}} align={"center"}>
                    <EditableSpan title={title} onChange={changeTodolistTitleHandler}/>
                    <IconButton aria-label="delete" onClick={removeTodoListHandler}>
                        <Delete/>
                    </IconButton>
                </Typography>
            </div>

            <AddItemForm addItem={addTaskHandler}/>

            <List>
                {tasks.map(task => {
                    return (
                        <Task
                            key={task.id}
                            task={task}
                            changeTaskTitle={changeTaskTitleHandler}
                            removeTask={removeTaskHandler}
                            changeTaskStatus={changeCheckboxHandler}
                        />)
                })}
            </List>
            <div>
                <ButtonGroup
                    variant={"contained"}
                    size={"small"}
                    disableElevation={true}
                >
                    <Button
                        color={filter === "all" ? 'secondary' : 'primary'}
                        onClick={filterTasksAll}
                    >All
                    </Button>
                    <Button
                        color={filter === "active" ? 'secondary' : 'primary'}
                        onClick={filterTasksActive}
                    >Active
                    </Button>
                    <Button
                        color={filter === "completed" ? 'secondary' : 'primary'}
                        onClick={filterTasksCompleted}
                    >Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
})