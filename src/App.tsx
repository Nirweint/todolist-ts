import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

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

type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed";

export function App() {

    // BLL - business logic layer:

    const todoListId_1 = v1();
    const todoListId_2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: "What to learn", filter: 'all'},
        {id: todoListId_2, title: "What to buy", filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ],
    })

    const removeTask = (taskId: string, todoListId: string) => {
        tasks[todoListId] = tasks[todoListId].filter(t => t.id !== taskId)
        setTasks({...tasks})
    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false,
        }
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})
    }
    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title} : t)})
    }

    const changeFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }
    const changeTodolistTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title} : tl))

    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }
    const addTodoList = (title: string) => {
        const newTodoList: TodoListType = {
            id: v1(),
            title,
            filter: 'all',
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoList.id]: []})
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
                    {todoLists.map(tl => {

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