import { Button, Checkbox, IconButton, TextField } from "@mui/material";
import { EditableSpan, Modal } from "common/components";
import React, { HTMLAttributes } from "react";
import s from "./Task.module.css";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import { TaskType } from "features/TodolistsList/api/tasks.api.types";
import { useTask } from "features/TodolistsList/ui/Todolist/Tasks/Task/useTasksForm";

type Props = {
  task: TaskType
} & HTMLAttributes<HTMLDivElement>

export const Task = ({ task, ...restProps }: Props) => {

  const {
    formik,
    isVisible,
    isTitleError,
    title,
    day,
    dayOfWeek,
    month,
    isTaskCompleted,
    changeTaskTitleHandler,
    changeTaskStatusHandler, removeTaskHandler, setIsVisible
  } = useTask(task);

  return (
    <div className={s.task} {...restProps} id={task.id}>
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
          <IconButton onClick={removeTaskHandler} title={"Remove task"} color={"warning"}>
            <DeleteOutlineSharpIcon />
          </IconButton>
        </div>
      </div>

      <Modal isVisible={isVisible} onClose={setIsVisible}>
        <form style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "1000px",
          width: "100%",
          minWidth: "320px"
        }} onSubmit={formik.handleSubmit}>
          <h3>Edit task</h3>
          <TextField label={(isTitleError && formik.errors.title) || "Title*"}
                     {...formik.getFieldProps("title")}
                     color={(isTitleError && "error") || "primary"}
          />
          <label>
            <small><b>Deadline: </b></small>
            <br />
            <input type="date" {...formik.getFieldProps("deadline")} />
          </label>

          <label>
            <small><b>Description: </b></small>
            <br />
            <textarea style={{ minHeight: "200px", resize: "none", width:'100%', borderRadius:'10px' }}
                      {...formik.getFieldProps("description")} />
          </label>
          <Button
            type={"submit"}
            variant={"contained"}
            disabled={!(formik.isValid)}
            endIcon={<CheckSharpIcon />}>
            Confirm
          </Button>
        </form>
      </Modal>

    </div>
  );
};
