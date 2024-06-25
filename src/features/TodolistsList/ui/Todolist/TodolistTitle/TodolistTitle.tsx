import { IconButton } from "@mui/material";
import { EditableSpan } from "common/components";
import React from "react";
import { useActions } from "common/hooks";
import { TodolistDomainType, todolistsThunks } from "features/TodolistsList/model/todolists.slice";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

type Props = {
  todolist: TodolistDomainType;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist;

  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);

  const removeTodolistCb = () => {
    removeTodolist(id);
  };

  const changeTodolistTitleCb = (title: string) => {
    if (todolist.title === title) return
    changeTodolistTitle({ id, title });
  };

  return (
    <h3 style={{margin: '0'}}>
      <EditableSpan value={title} onChange={changeTodolistTitleCb} />
      <IconButton onClick={removeTodolistCb} disabled={entityStatus === "loading"} color={'warning'}>
        <ClearOutlinedIcon />
      </IconButton>
    </h3>
  );
};
