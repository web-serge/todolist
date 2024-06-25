import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "common/components";
import { useActions } from "common/hooks";
import { selectTodolists, todolistsThunks } from "features/TodolistsList/model/todolists.slice";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Todolist } from "./Todolist/Todolist";
import { selectIsLoggedIn } from "features/auth/model/auth.slice";

export const TodolistsList = () => {
  const todolists = useSelector(selectTodolists);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { addTodolist, fetchTodolists } = useActions(todolistsThunks);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    fetchTodolists();
  }, [fetchTodolists, isLoggedIn]);

  const addTodolistCb = (title: string) => {
    return addTodolist(title);
  };

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <AddItemForm addItem={addTodolistCb} placeholder="Add todo" />
      <Grid container spacing={3} sx={{marginTop: '10px'}}>
        {todolists.map((tl) => {
          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist todolist={tl} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
