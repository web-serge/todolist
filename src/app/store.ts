import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "features/TodolistsList/model/tasks.slice";
import { todolistsName, todolistsReducer } from "features/TodolistsList/model/todolists.slice";
import { appSlice } from "app/app.slice";
import { authSlice } from "features/auth/model/auth.slice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    [todolistsName]: todolistsReducer,
    app: appSlice,
    auth: authSlice,
  },
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
