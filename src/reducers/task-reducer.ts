import {TasksStateType} from '../App';
import {v1} from 'uuid';

type TaskReducerType =
    RemoveTaskACType
    | AddTaskAC
    | ChangeStatusACType
    | UpdateTaskTypeACType
    | deleteTasksACType
    | AddNewTasksArrayACType
export const taskReducer = (state: TasksStateType, action: TaskReducerType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.id]: state[action.payload.id].filter(el => el.id !== action.payload.taskId)
            }
        }

        case "ADD-TASK": {
            const newTask = {id: v1(), title: action.payload.title, isDone: false};
            return {...state, [action.payload.id]: [newTask, ...state[action.payload.id]]}
        }

        case "CHANGE-STATUS": {
            return {
                ...state, [action.payload.id]: state[action.payload.id]
                    .map(el => el.id === action.payload.taskId ? {...el, isDone: action.payload.isDone} : el)
            }
        }

        case "UPDATE-TASK": {
            return {
                ...state, [action.payload.id]: state[action.payload.id]
                    .map(el => el.id === action.payload.taskId ? {...el, title: action.payload.title} : el)
            }
        }

        case 'DELETE-TASKS': {
            const copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
           // delete state[action.payload.id] //! сделать иммутабельно
           // return {...state}
        }

        case "ADD-NEW-ARRAY":
            return {...state, [action.payload.id]: []}

        default:
            return state
    }
}

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, taskId: string) => ({type: 'REMOVE-TASK', payload: {id, taskId}} as const)

type AddTaskAC = ReturnType<typeof addTaskAC>
export const addTaskAC = (id: string, title: string) => ({type: 'ADD-TASK', payload: {id, title}} as const)

type ChangeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (id: string, taskId: string, isDone: boolean) => ({
    type: 'CHANGE-STATUS',
    payload: {id, taskId, isDone}
} as const)

type UpdateTaskTypeACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (id: string, taskId: string, title: string) => ({
    type: 'UPDATE-TASK',
    payload: {id, taskId, title}
} as const)

type deleteTasksACType = ReturnType<typeof deleteTasksAC>
export const deleteTasksAC = (id: string) => ({type: 'DELETE-TASKS', payload: {id}} as const)

type AddNewTasksArrayACType = ReturnType<typeof addNewTasksArrayAC>
export const addNewTasksArrayAC = (id: string) => ({type: 'ADD-NEW-ARRAY', payload: {id}} as const)