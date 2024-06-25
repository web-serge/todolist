import { createSlice, isRejected, PayloadAction } from "@reduxjs/toolkit";
import { RequestStatusType } from "app/app.slice";
import { clearTasksAndTodolists } from "common/actions";
import { ResultCode } from "common/enums";
import { createAppAsyncThunk, handleServerAppError, thunkTryCatch } from "common/utils";
import { todolistsApi } from "features/TodolistsList/api/todolistsApi";
import { TodolistType, UpdateTodolistTitleArgType } from "../api/todolistsApi.types";

const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, void>(
  "todolists/fetchTodolists",
  async () => {
    const res = await todolistsApi.getTodolists()
    return { todolists: res.data }
  },
)

const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>(
  "todolists/addTodolist",
  async (title, { rejectWithValue }) => {
    const res = await todolistsApi.createTodolist(title)
    if (res.data.resultCode === ResultCode.Success) {
      return { todolist: res.data.data.item }
    } else {
      return rejectWithValue(res.data)
    }
  },
)

const removeTodolist = createAppAsyncThunk<{ id: string }, string>("todolists/removeTodolist", async (id, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(todolistsActions.changeTodolistEntityStatus({ id, entityStatus: "loading" }))
  const res = await todolistsApi.deleteTodolist(id)
  if (res.data.resultCode === ResultCode.Success) {
    return { id }
  } else {
    return rejectWithValue(res.data)
  }
})

const changeTodolistTitle = createAppAsyncThunk<UpdateTodolistTitleArgType, UpdateTodolistTitleArgType>(
  "todolists/changeTodolistTitle",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await todolistsApi.updateTodolist(arg)
      if (res.data.resultCode === ResultCode.Success) {
        return arg
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    })
  },
)

const initialState: TodolistDomainType[] = []

const slice = createSlice({
  name: "todolists",
  initialState,
  reducers: {
    changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const todo = state.find((todo) => todo.id === action.payload.id)
      if (todo) {
        todo.filter = action.payload.filter
      }
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) => {
      const todo = state.find((todo) => todo.id === action.payload.id)
      if (todo) {
        todo.entityStatus = action.payload.entityStatus
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        const newTodolist: TodolistDomainType = {
          ...action.payload.todolist,
          filter: "all",
          entityStatus: "idle",
        }
        state.push(newTodolist)
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id)
        if (index !== -1) state.splice(index, 1)
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const todo = state.find((todo) => todo.id === action.payload.id)
        if (todo) {
          todo.title = action.payload.title
        }
      })
      .addCase(clearTasksAndTodolists, () => {
        return []
      })
      .addMatcher(isRejected(todolistsThunks.removeTodolist), (state, action) => {
        const todo = state.find((todo) => todo.id === action.meta.arg)
        if (todo) {
          todo.entityStatus = "idle"
        }
      })
  },
  selectors: {
    selectTodolists: state => state
  }
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const todolistsName = slice.name
export const {selectTodolists} = slice.selectors
export const todolistsThunks = { fetchTodolists, addTodolist, removeTodolist, changeTodolistTitle }

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
