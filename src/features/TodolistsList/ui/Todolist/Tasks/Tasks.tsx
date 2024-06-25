import React from "react";
import { useSelector } from "react-redux";
import { TaskStatuses } from "common/enums";
import { TodolistDomainType } from "features/TodolistsList/model/todolists.slice";
import { Task } from "./Task/Task";
import { selectTasks } from "features/TodolistsList/model/tasks.slice";

type Props = {
  todolist: TodolistDomainType;
};

export const Tasks = ({ todolist }: Props) => {
  const tasks = useSelector(selectTasks);

  let tasksForTodolist = tasks[todolist.id];

  if (todolist.filter === "active") {
    tasksForTodolist = tasksForTodolist.filter((t) => t.status === TaskStatuses.New);
  }

  if (todolist.filter === "completed") {
    tasksForTodolist = tasksForTodolist.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <>
      {tasksForTodolist.map((t) => (
        <Task key={t.id} task={t} />
      ))}
    </>
  );
};
