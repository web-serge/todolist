import { AddItemForm } from "common/components";
import { useActions } from "common/hooks";
import { tasksThunks } from "features/TodolistsList/model/tasks.slice";
import { TodolistDomainType } from "features/TodolistsList/model/todolists.slice";
import React, { useEffect } from "react";
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "./Tasks/Tasks";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";

type Props = {
  todolist: TodolistDomainType;
};

export const Todolist = ({ todolist }: Props) => {
  const { fetchTasks, addTask } = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(todolist.id);
  }, [fetchTasks, todolist.id]);

  const addTaskCb = (title: string) => {
    return addTask({ title, todolistId: todolist.id });
  };
  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCb} disabled={todolist.entityStatus === "loading"} placeholder="Add task" />
      <Tasks todolist={todolist} />
      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButtons todolist={todolist} />
      </div>
    </div>
  );
};
