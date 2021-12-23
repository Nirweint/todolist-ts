import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";
import {TasksStateType} from "../App";

type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskId: string
    todoListId: string
}
type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todoListId: string
}
type ChangeTaskStatusACActionType = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    isDone: boolean
    todoListId: string
}
type ChangeTaskTitleACActionType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    title: string
    todoListId: string
}

export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusACActionType
    | ChangeTaskTitleACActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

let initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}
        case "ADD-TASK":
            return {...state, [action.todoListId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todoListId]]}
        case "CHANGE-TASK-STATUS":
            return {...state, [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {...t, isDone: action.isDone}: t)}
        case "CHANGE-TASK-TITLE":
            return {...state, [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {...t, title: action.title}: t)}
        case "ADD-TODOLIST":
            return {...state, [action.todolistId]: []}
        case "REMOVE-TODOLIST":
            // let {[action.todolistID]: [], ...newState1} = {...state}
            let newState = {...state}
            delete newState[action.todolistID]
            return newState
        default:
            return state
    }
}


export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {
        type: "REMOVE-TASK",
        taskId,
        todoListId,
    }
}
export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return {
        type: "ADD-TASK",
        title,
        todoListId,
    }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusACActionType => {
    return {
        type: "CHANGE-TASK-STATUS",
        taskId,
        isDone,
        todoListId,
    }
}
export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ChangeTaskTitleACActionType => {
    return {
        type: "CHANGE-TASK-TITLE",
        taskId,
        title,
        todoListId,
    }
}