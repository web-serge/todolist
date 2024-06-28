import React, { DragEvent, useState } from "react";
import { useSelector } from "react-redux";
import { TaskStatuses } from "common/enums";
import { TodolistDomainType } from "features/TodolistsList/model/todolists.slice";
import { Task } from "./Task/Task";
import { selectTasks, tasksThunks } from "features/TodolistsList/model/tasks.slice";
import { useAppDispatch } from "common/hooks";

type Props = {
  todolist: TodolistDomainType;
};

export const Tasks = ({ todolist }: Props) => {
  const tasks = useSelector(selectTasks);
  const dispatch = useAppDispatch();
  const [dragId, setDragId] = useState<string | null>(null);

  let tasksForTodolist = tasks[todolist.id];

  if (todolist.filter === "active") {
    tasksForTodolist = tasksForTodolist.filter((t) => t.status === TaskStatuses.New);
  }

  if (todolist.filter === "completed") {
    tasksForTodolist = tasksForTodolist.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <>
      {tasksForTodolist.map((task) => {
        const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
          e.currentTarget.style.background = "white";
        };

        const onDragStart = (e: DragEvent<HTMLDivElement>) => {
          setDragId(e.currentTarget.id);
        };

        const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
          // Optional: Reset any styles or state when the drag ends
        };

        const onDragOver = (e: DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          e.currentTarget.style.background = "lightgrey";
        };

        const onDrop = (e: DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          e.currentTarget.style.background = "white";
           if (dragId) {
             dispatch(tasksThunks.drag({ taskId: dragId, todolistId: todolist.id, putAfterItemId: e.currentTarget.id }))
               .then(() => dispatch(tasksThunks.fetchTasks(task.todoListId)));
           } else console.log(dragId);

        };

        return (
          <Task
            style={{ cursor: "grab" }}
            draggable={true}
            onDragLeave={onDragLeave}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            onDrop={onDrop}
            key={task.id}
            task={task}
          />
        );
      })}
    </>
  );
};