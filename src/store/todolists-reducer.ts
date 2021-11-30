import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}

type AddTodoListActionType = {
    type: "ADD-TODOLIST"
    title: string
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


export const todoListsReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)

        case "ADD-TODOLIST":
            const newTodoList: TodoListType = {
                id: v1(),
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


export const removeTodoListAC = (id: string): RemoveTodoListActionType => {
    return {
        type: "REMOVE-TODOLIST",
        id: id,
    }
}

export const addTodoListAC = (title: string): AddTodoListActionType => {
    return {
        type: "ADD-TODOLIST",
        title: title
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