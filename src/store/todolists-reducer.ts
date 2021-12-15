import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    todolistID: string
}

export type AddTodoListActionType = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}

type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}

type ChangeFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}

export type ActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodolistTitleActionType
    | ChangeFilterActionType


let initialState: Array<TodoListType> = []

export const todoListsReducer = (state: Array<TodoListType> = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todolistID)
        case "ADD-TODOLIST":
            const newTodoList: TodoListType = {
                id: action.todolistId,
                title: action.title,
                filter: 'all',
            }
            return [...state, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return state
    }
}


export const removeTodoListAC = (todolistID: string): RemoveTodoListActionType => {
    return {
        type: "REMOVE-TODOLIST",
        todolistID,
    }
}
export const addTodoListAC = (title: string): AddTodoListActionType => {
    return {
        type: "ADD-TODOLIST",
        title: title,
        todolistId: v1(),
    }
}
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        id: id,
        title: title,
    }
}
export const ChangeFilterAC = (id: string, filter: FilterValuesType): ChangeFilterActionType => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        id: id,
        filter: filter,
    }
}