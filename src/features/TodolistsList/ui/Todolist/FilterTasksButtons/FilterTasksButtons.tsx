import { Button } from "@mui/material";
import React, { memo } from "react";
import { useActions } from "common/hooks";
import { FilterValuesType, TodolistDomainType, todolistsActions } from "features/TodolistsList/model/todolists.slice";

type Props = {
  todolist: TodolistDomainType;
};

export const FilterTasksButtons = memo(({ todolist }: Props) => {
  const { filter, id } = todolist;
  const { changeTodolistFilter } = useActions(todolistsActions);

  const filterTasksHandler = (filter: FilterValuesType) => {
    changeTodolistFilter({ filter, id });
  };

  return (
    <>
      <Button
        variant={filter === "all" ? "outlined" : "text"}
        onClick={() => filterTasksHandler("all")}
        color={"inherit"}
      >
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        onClick={() => filterTasksHandler("active")}
        color={"primary"}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        onClick={() => filterTasksHandler("completed")}
        color={"success"}
      >
        Completed
      </Button>
    </>
  );
});
