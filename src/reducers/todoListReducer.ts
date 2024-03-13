import {FilterValuesType, TodolistType} from '../App';

type TodoListReducerType = RemoveTodolistACType | ChangeFilterType | addNewTodoListACType | RenameTodolistACType
export const todoListReducer = (state: TodolistType[], action: TodoListReducerType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.id)
        }
        case "CHANGE-FILTER": {
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        }

        case "ADD-NEW-TODOLIST":
            return [{id: action.payload.id, title: action.payload.title, filter: 'all'}, ...state]

        case "RENAME-TODOLIST":
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.newTitle} : el)

        default:
            return state
    }
}
type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', payload: {id}} as const)

type ChangeFilterType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-FILTER',
    payload: {id, filter}
} as const)

type addNewTodoListACType = ReturnType<typeof addNewTodoListAC>
export const addNewTodoListAC = (id: string, title: string) => ({
    type: 'ADD-NEW-TODOLIST',
    payload: {id, title}
} as const)

type RenameTodolistACType = ReturnType<typeof renameTodolistAC>
export const renameTodolistAC = (id: string, newTitle: string) => ({
    type: 'RENAME-TODOLIST',
    payload: {id, newTitle}
} as const)