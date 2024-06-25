import { Button, Checkbox, IconButton, TextField } from "@mui/material";
import { EditableSpan, Modal } from "common/components";
import { TaskStatuses } from "common/enums";
import React, { ChangeEvent, useState } from "react";
import { useActions } from "common/hooks";
import s from "./Task.module.css";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import { TaskType } from "features/TodolistsList/api/tasksApi.types";
import { tasksThunks } from "features/TodolistsList/model/tasks.slice";
import { getDate } from "common/utils/getDate";

type Props = {
  task: TaskType
}

export const Task = ({ task }: Props) => {
  const { id: taskId, todoListId: todolistId, title } = task;
  const [isVisible, setIsVisible] = useState(false);
  const { removeTask, updateTask } = useActions(tasksThunks);

  const removeTaskHandler = () => {
    removeTask({ taskId, todolistId });
  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
    updateTask({ taskId, domainModel: { status }, todolistId });
  };

  const changeTaskTitleHandler = (title: string) => {
    if (task.title === title) return;
    updateTask({ taskId, domainModel: { title }, todolistId });
  };

  const isTaskCompleted = task.status === TaskStatuses.Completed;
  const { dayOfWeek, day, month } = getDate(task.addedDate);


  return (
    <div className={s.task}>
      <div className={s.addedDate}>
        <small>{dayOfWeek}</small>
        <small style={{ color: "blue" }}>{month}</small>
        <small>{day}</small>
      </div>
      <div className={s.main}>
        <div>
          <Checkbox checked={isTaskCompleted} color="primary" onChange={changeTaskStatusHandler} />
          <EditableSpan value={title} onChange={changeTaskTitleHandler} className={isTaskCompleted ? s.isDone : ""} />
        </div>
        <div>
          <IconButton onClick={() => setIsVisible(true)} title={"Edit task"}>
            <EditNoteSharpIcon />
          </IconButton>
          <IconButton onClick={removeTaskHandler} title={"Remove task"} color={'warning'}>
            <DeleteOutlineSharpIcon />
          </IconButton>
        </div >
      </div>
      <Modal isVisible={isVisible} onClose={setIsVisible}>
        <form>
          <h3>Edit task</h3>
          <div>
            <TextField value={task.title} />
          </div>
          <Button onClick={() => {
          }} endIcon={<CheckSharpIcon />}>
            Confirm
          </Button>
        </form>
      </Modal>
    </div>
  );
};
