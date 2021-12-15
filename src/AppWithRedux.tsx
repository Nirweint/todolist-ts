import React, {useReducer, useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    ChangeFilterAC,
    ChangeTodolistTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed";

export function AppWithRedux() {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType ,Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType ,TasksStateType>(state => state.tasks)

    // const todoListId_1 = v1();
    // const todoListId_2 = v1();
    //
    // const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
    //     {id: todoListId_1, title: "What to learn", filter: 'all'},
    //     {id: todoListId_2, title: "What to buy", filter: 'all'},
    // ])
    // const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    //     [todoListId_1]: [
    //         {id: v1(), title: "HTML", isDone: true},
    //         {id: v1(), title: "CSS", isDone: true},
    //         {id: v1(), title: "React", isDone: false},
    //         {id: v1(), title: "Redux", isDone: false},
    //     ],
    //     [todoListId_2]: [
    //         {id: v1(), title: "HTML", isDone: true},
    //         {id: v1(), title: "CSS", isDone: true},
    //         {id: v1(), title: "React", isDone: false},
    //         {id: v1(), title: "Redux", isDone: false},
    //     ],
    // })

    const removeTask = (taskId: string, todoListId: string) => {
        dispatch(removeTaskAC(taskId, todoListId))
    }
    const addTask = (title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
    }
    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todoListId))
    }

    const changeFilter = (filter: FilterValuesType, todoListId: string) => {
        dispatch(ChangeFilterAC(todoListId, filter))
    }
    const changeTodolistTitle = (title: string, todoListId: string) => {
        dispatch(ChangeTodolistTitleAC(todoListId, title))
    }
    const removeTodoList = (todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
    }
    const addTodoList = (title: string) => {
        const action = addTodoListAC(title)
        dispatch(action)
    }

    // UI:

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(tl => {

                        let tasksForRender: Array<TaskType> = tasks[tl.id]
                        if (tl.filter === "active") {
                            tasksForRender = tasks[tl.id].filter(t => !t.isDone)
                        }
                        if (tl.filter === "completed") {
                            tasksForRender = tasks[tl.id].filter(t => t.isDone)
                        }

                        return (
                            <Grid item key={tl.id}>
                                <Paper elevation={2} style={{padding: 15}}>
                                    <TodoList
                                        id={tl.id}
                                        filter={tl.filter}
                                        title={tl.title}
                                        tasks={tasksForRender}
                                        removeTask={removeTask}
                                        addTask={addTask}
                                        changeFilter={changeFilter}
                                        changeTaskStatus={changeTaskStatus}
                                        removeTodoList={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}